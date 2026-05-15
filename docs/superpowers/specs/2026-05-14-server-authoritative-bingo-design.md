# Server-Authoritative Sussy Bingo — Design

**Date:** 2026-05-14
**Status:** Approved (brainstorming)

## Goal

Rebuild Sussy Bingo so it plays like a Jackbox party game: the TV is a shared gamemaster screen, phones are player controllers, players join a lobby, the host launches the game, and a live leaderboard runs throughout. The current build's index-based client sync is brittle — a refresh or dropped message permanently desyncs a player. This design moves all game state to the server (stateless Lambda + DynamoDB) so any client — host or player — can refresh, reconnect, and resume cleanly.

Constraints:
- Backend remains stateless Lambda + DynamoDB. No always-on server. Must run essentially free for a party night.
- Single global room. No room codes, no multi-tenancy.
- Session = one bingo card. Scores reset on each new card.
- In-person play; trust model is friendly (no anti-cheat).
- Quote ingest stays client-side on the host (no S3).

## Architectural shift

The Lambda today is a dumb relay; clients track their own `clickedBingoSquaredIndex` and judge their own correctness. This design inverts that:

- **Server owns the truth.** Current quote, every player's guess for it, scores, and each player's card all live in DynamoDB. Lambda mutates and broadcasts on every event.
- **Clients render.** No local index counter. Receive a `quote` message → render it. Submit a `guess` → wait for `reveal` to learn the result.
- **Reconnect is a single message.** On reconnect, a client sends `join { playerId }` (cached in localStorage) and the server replies with all state it needs to rehydrate.

## Data model

Single DynamoDB table `SussyBingoState`, keyed by `PK` / `SK`:

| Entity | PK | SK | Fields |
|---|---|---|---|
| Card session | `CARD` | `CURRENT` | `cardId`, `phase` (`lobby` \| `live`), `currentQuoteIndex`, `weights` blob, `startedAt`, `ttl` |
| Player | `CARD#<cardId>` | `PLAYER#<playerId>` | `name`, `score`, `joinedAt`, `card` (5×5 string grid, null in lobby) |
| Quote round | `CARD#<cardId>` | `QUOTE#<index>` | `quote`, `possibleAnswers[]`, `truth?`, `guesses: {playerId: name}`, `revealed: bool` |
| Connection | `CONN` | `<connectionId>` | `role` (`host` \| `player`), `playerId?`, `cardId` |

Notes:

- Only one `CARD/CURRENT` item ever exists; starting a new card writes a new `cardId` to it. Old card's child items (`Player`, `QUOTE`) self-expire via DynamoDB TTL (~6 hours).
- Card grids live on the Player row so refresh-resume returns the exact same card.
- Guesses are keyed by playerId on the Quote row, so reveal scoring is one read.
- Connection rows map `connectionId → playerId`; deleted on `$disconnect`. Player rows survive disconnects.
- Host is just a role. Multiple host connections are allowed (TV + controlling phone). Host-only messages are checked against `role=host`.

## Phase model

`lobby` → `live` → (`lobby` via End Game, or fresh `live` via New Card).

- **lobby**: card session exists, no weights, players can join but have no card. Host sees a list of joined players.
- **live**: weights uploaded, every joined player has a card, quotes can be pushed and revealed.
- **End Game** returns to `lobby`, dropping cards but keeping player identities.
- **New Card** (while live) regenerates cards and zeroes scores; stays in `live`.

## WebSocket protocol

All messages `{ type, ...payload }`.

### Identity & lifecycle

| Direction | Type | Purpose |
|---|---|---|
| C→S | `join { name, playerId? }` | Player joins or rejoins. If `playerId` matches current `cardId`, resume; else issue new identity. |
| S→C | `joined { playerId, cardId, phase, name, score, card?, currentQuote?, yourGuess?, leaderboard, players }` | Full state snapshot for rehydration. |
| C→S | `host_hello {}` | Connection registers as host. If no card session exists, server creates one in `lobby`. |
| S→C | `host_state { cardId, phase, currentQuote?, leaderboard, players }` | Host rehydration snapshot. |

### Lobby

| Direction | Type | Purpose |
|---|---|---|
| S→all | `lobby_update { players: [{playerId, name}] }` | Broadcast on every player join/disconnect during lobby. Drives TV "people arriving" UI. |
| C→S | `start_card { weights }` (host-only) | Generate cards for all current players from the weighted name distribution, transition to `live`. The quote pool itself stays client-side on the host. |
| S→all | `card_started { cardId, leaderboard }` | Tells everyone the game is starting. |
| S→C | `your_card { card }` | Per-player card delivery. |

### Live gameplay

| Direction | Type | Purpose |
|---|---|---|
| C→S | `next_quote { quote, possibleAnswers }` (host-only) | Writes new Quote round row, broadcasts to all. |
| S→all | `quote { index, quote, possibleAnswers }` | Players render and can guess. |
| C→S | `guess { quoteIndex, guess }` | Player's guess. Conditional write on `revealed=false`. |
| S→C | `guess_ack { quoteIndex, guess }` | Confirms guess recorded. |
| S→C | `guess_rejected { quoteIndex, reason }` | E.g., `'too_late'` if reveal already fired. |
| C→S | `reveal { truth }` (host-only) | Server scores all guesses for current round. |
| S→all | `reveal { index, truth, perPlayer: [{playerId, name, guess, correct}], leaderboard }` | Final round result. |
| C→S | `end_game {}` (host-only) | Returns session to `lobby`, drops cards. |
| S→all | `returned_to_lobby { players }` | Broadcast on End Game. |

### Why this kills the desync problem

Clients no longer compare indices. The server is the only thing that decides what "the current quote" is. A stale `guess` is rejected explicitly rather than silently going to the wrong round. Reconnect = one `join` round-trip.

## Frontend split

`AppComponent` today is ~480 lines doing four jobs. Split into:

- **Routes**: `/` (landing), `/play` (player view), `/host` (TV view), `/cloud` (existing word cloud).
- **Components**: `LandingComponent`, `PlayerComponent`, `HostComponent`, plus existing `WordCloudComponent`.
- **Services**:
  - `IdentityService` — owns `{playerId, name, cardId}` in localStorage.
  - `GameStateService` — single client-side source of truth, subscribed to `WebSocketService.messages$`, exposes observables to components.
  - `WebSocketService` — gains exponential-backoff reconnect (250ms → 4s cap), send queue that drains on reconnect, `onReconnect` hook that fires `join` / `host_hello` automatically.
  - `QuoteIngestService` — existing `regexData` / `generateStats` / `collapseStats` logic, moved out of `AppComponent`. Used by `HostComponent` only.

### Player (`/play`) flow

1. On load, if `localStorage.identity.playerId` exists, send `join { playerId, name }` immediately.
2. Otherwise, show a name input. On submit, send `join { name }`, cache the returned `playerId` and `cardId`.
3. While `phase=lobby`, show "Waiting for the host to start…" with the player list from `lobby_update`.
4. On `card_started`/`your_card`, swap to bingo card view.
5. On `quote`, render quote + possible answers above the card.
6. Tap a square → send `guess`. On `guess_ack`, show "locked in" UI. On `reveal`, mark the square correct/incorrect from server verdict.
7. The `onThisOneIsNotOnMyCard` desync placeholder is deleted entirely.

### Host (`/host`, TV) flow

1. On load, send `host_hello`. If a card session is in progress, rehydrate.
2. Lobby view: big "Players in the room" tile grid, populated by `lobby_update`. "Start Game" button is disabled when zero players.
3. "Start Game" → `QuoteIngestService` parses the ingest file; host sends `start_card { weights }`. UI swaps to live view.
4. Live view layout: current quote large, 4 possible authors, "Next Quote" + "Reveal" + "New Card" + "End Game" buttons, leaderboard down one side (name + score, sorted, animated on changes).
5. "Next Quote" picks the next quote from the local pool, sends `next_quote`. "Reveal" sends `reveal { truth }`. "New Card" sends `start_card` again. "End Game" sends `end_game`.

### localStorage shape

```json
{
  "sussy-bingo:identity": { "playerId": "...", "name": "...", "cardId": "..." }
}
```

`cardId` lets the client detect stale identity. If server returns a different `cardId` on `join`, the cache is silently updated and the player gets a fresh card.

## Resiliency matrix

| Scenario | Behavior |
|---|---|
| Player wifi blip | Reconnect with backoff; `join { playerId }` rehydrates including any already-submitted guess. |
| Player refreshes mid-round | Same as above. |
| Host TV refreshes mid-round | `host_hello` rehydrates current quote + leaderboard. No client-visible effect. |
| Host TV closed entirely | DDB state persists until TTL (~6h). TV reopens → resumes. |
| Player joins mid-card | Server generates a card from current weights, score 0, starts guessing on next quote. |
| Same playerId on two devices | Both connections receive broadcasts. One player on two screens. Acceptable. |
| Guess vs reveal race | `guess` write is conditional on `revealed=false`. On lose, server sends `guess_rejected`. |
| Stale playerId from previous night | Server doesn't find player under current cardId → issues fresh playerId + card. |
| Lambda cold start | ~1s worst-case delay. No correctness impact. |

Explicitly out of scope:
- No replay log for missed rounds; if a player joined after a quote was revealed, that quote is just gone for them.
- No moderation (kick, manual score edit).
- No persistence across nights.
- No spectator role.
- No auth on the host role (party-trust model).

## Migration / rollout

The CDK stack needs a DynamoDB table added (TTL enabled) and the Lambda needs to read/write it on each route. The current frontend's single-component shape needs to be carved up before any of the protocol changes can land cleanly.

Order of operations (to be detailed in the implementation plan):
1. Infra: add DDB table + IAM in CDK.
2. Lambda: switch from relay to authoritative state machine.
3. Frontend: extract services, split routes, build lobby UIs.
4. Frontend: wire reconnect logic.
5. Smoke test in person.
