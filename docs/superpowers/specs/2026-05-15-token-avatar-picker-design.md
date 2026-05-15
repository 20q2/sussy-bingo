# Token Avatar Picker — Design

Jackbox-style player avatar picker for the Sussy Bingo lobby. Players join with just a name, then claim an MTG token avatar from a shared grid in the lobby. Taken avatars disable across all clients in real time. Avatars surface in the lobby roster, leaderboard, reveal screen, and host view.

## Goals & Non-Goals

**Goals**
- Give every player a recognizable visual identity beyond their typed name.
- Match the Jackbox party-game feel (shared screen on the TV, phones as controllers).
- Lean into the existing MTG-land theme already present in the app's backgrounds.
- Keep the picker snappy and offline-friendly at runtime (no live Scryfall calls on the hot path).

**Non-Goals**
- Custom uploads or arbitrary user-supplied images.
- Per-user persistence across sessions — picks are scoped to a single lobby's lifetime.
- Avatars on bingo squares. Squares represent the canonical quote author (from `nickNameMap`), not players in the current lobby; mixing those identity systems would confuse reveals.

## Avatar Source

MTG token card art via Scryfall, baked at build time into a static asset.

A new `tools/fetch-tokens.ts` script queries:

```
https://api.scryfall.com/cards/search
  ?q=type:token+type:creature+frame:2015+game:paper+-is:reprint
  &unique=art
  &order=released
```

The script:
1. Pages through results with a 100ms sleep between requests and a descriptive `User-Agent` header.
2. Keeps entries that have `image_uris.art_crop` set.
3. Dedupes by `name` so we don't ship five different Goblins.
4. Takes the first 50 results.
5. Writes pretty-printed JSON to `src/assets/tokens.json` with shape `{ id, name, artist, artCropUrl }[]`.
6. Logs artist names to stdout so a human can eyeball the pool before committing.

The script is invoked manually via `npm run fetch-tokens`; output is committed to git. The build itself requires no network access. Re-running the script refreshes the pool.

`src/assets/tokens.json` is also bundled into the Lambda deploy via a CDK asset so the server can validate picks against the canonical pool.

**Attribution.** Scryfall's terms ask for visible artist credit. The picker tile shows `artist` as a caption on hover/tap, and the player's lobby tile shows it as a small caption beneath the avatar.

## Protocol Changes

In [src/app/models/protocol.ts](../../src/app/models/protocol.ts):

```ts
// Augmented
export interface PlayerSummary {
  playerId: string;
  name: string;
  tokenId: string | null;   // null = haven't picked yet
}

// New ClientMessage variant
| { type: 'pick_token'; tokenId: string | null }   // null = release current pick

// New ServerMessage variant
| { type: 'pick_rejected'; reason: 'taken' | 'unknown_token' | 'game_started' }
```

The existing `lobby_update` already carries `players: PlayerSummary[]`. Once `PlayerSummary.tokenId` exists, taken/available state for the grid is derivable client-side: any non-null `tokenId` in the roster means that token is claimed. No separate "available tokens" payload is needed.

The existing `joined` and `host_state` server messages already include `players: PlayerSummary[]` and `name`, so they get the new field for free.

## Server (Lambda) Behavior

In `infra/lambda/websocket-handler.ts`:

- **Cold-start setup.** `require('./tokens.json')` produces a `Set<string>` of valid token IDs.
- **On `pick_token`.** Reject (`pick_rejected`) if:
  - The lobby is in `live` phase → `game_started`.
  - `tokenId !== null` and not in the valid set → `unknown_token`.
  - `tokenId !== null` and another player in the same lobby already holds it → `taken`.
  
  Otherwise update the player's record (DynamoDB) and broadcast `lobby_update`. Re-picking your own token is just an overwrite that frees the prior one — both events are captured in the single broadcast.
- **On `start_card`.** Before broadcasting `card_started`, scan the lobby's players. For any with `tokenId === null`, assign a random token from `validPool − {already-taken IDs}`. Persist and include those assignments in the subsequent state broadcasts.
- **On disconnect (lobby phase only).** Clearing the player record already happens; that implicitly frees their `tokenId`. No extra logic needed — the next `lobby_update` reflects it.

## Frontend Components

### New: `TokensService`

`src/app/services/tokens.service.ts`. Singleton. Fetches `assets/tokens.json` once at app startup, exposes:

- `tokens: Token[]` — full pool
- `byId(tokenId: string | null): Token | undefined`

### New: `TokenAvatarComponent`

`src/app/components/token-avatar/`. Pure presentational. Inputs:

- `tokenId: string | null`
- `size: 'sm' | 'md' | 'lg'` (default `'md'`)

Renders a circular cropped `<img>` from `TokensService.byId(tokenId)?.artCropUrl`. When `tokenId` is null or unknown, renders a neutral silhouette placeholder.

Used wherever a player is visually represented.

### New: `TokenPickerComponent`

`src/app/components/token-picker/`. Inputs:

- `tokens: Token[]` — the full pool
- `players: PlayerSummary[]` — current lobby roster (drives taken state)
- `myPlayerId: string`

Renders a responsive grid of token tiles. Per-tile state:

- **Available** — clickable, hover/tap surfaces `name` and `artist`.
- **Taken by someone else** — grayed out, owner's name overlaid, not clickable.
- **Mine** — highlighted ring; clicking another tile swaps; clicking the same tile releases (sends `tokenId: null`).

Emits `pick(tokenId: string | null)`, which the parent (`PlayerComponent`) forwards to `WebSocketService` as `{ type: 'pick_token', tokenId }`.

### Page wiring

- **[pages/player/player.component.html](../../src/app/pages/player/player.component.html)** — during the lobby phase, render `<app-token-picker>` below the existing player list. The picker is hidden once `phase === 'live'`.
- **[pages/host/host.component.html](../../src/app/pages/host/host.component.html)** — replace bare player-name tiles in the lobby with `<app-token-avatar>` + name. During the game:
  - **Leaderboard** rows → small avatar before each entry.
  - **Reveal** rows (per-player guesses) → small avatar on the left.
  - **Persistent player tiles** on the TV view → medium avatar + name.
- **Player live view** — leaderboard rows gain an avatar; if the player view also surfaces per-player guesses on reveal, those rows get the same treatment as the host's reveal rows.
- **Landing screen** — unchanged. Still name-only join.

### Styling

- Circular crop via `border-radius: 50%`.
- Approximate sizes: picker tiles ~96px, lobby roster avatars ~48px, leaderboard / reveal avatars ~32px.
- No animations for v1.
- Adheres to existing "no busy/disabled cursors" rule (memory: `feedback_no_busy_cursors.md`) — taken tiles are visually grayed and inert but don't show a `not-allowed` cursor.

## Data Flow Summary

1. App boots → `TokensService` fetches `assets/tokens.json`.
2. Player enters name on landing → `{ type: 'join', name }` (unchanged).
3. Server adds player to DynamoDB with `tokenId: null`, broadcasts `lobby_update`.
4. Player sees picker grid → clicks a tile → `{ type: 'pick_token', tokenId }`.
5. Server validates, updates record, broadcasts `lobby_update` → every client's picker re-renders with the new taken state.
6. Host clicks Start → server fills in random unused tokens for any null pickers, then proceeds with the existing `card_started` / quote flow. Avatars now render in leaderboard, reveal, and host player tiles via `TokenAvatarComponent`.

## Edge Cases

- **Pick race.** Two clients both click the same tile at the same instant. Lambda processes them serially per lobby; whoever's message lands second receives `pick_rejected: 'taken'` and the picker reverts visually on the next `lobby_update`.
- **Pick after game start.** Server returns `pick_rejected: 'game_started'`. The picker is already hidden in this phase, so this is defense-in-depth.
- **Unknown `tokenId`.** Client sends a string not in the pool (likely a stale `tokens.json` or a tampered request). Server rejects with `unknown_token`; client logs and ignores.
- **Disconnect with token held.** Existing player-record cleanup frees the token via the next `lobby_update`. No additional logic.
- **`tokens.json` fetch fails on the client.** `TokensService` exposes an empty pool; the picker renders an empty grid with a "couldn't load avatars" message. Players can still join and play (avatars just won't show — `TokenAvatarComponent` falls back to the silhouette placeholder).
- **Pool drift between client and Lambda.** Both ship the same committed `tokens.json`. If a deploy is partial (frontend updated, Lambda not), clients might offer IDs the server doesn't recognize → `unknown_token` rejection. Acceptable; deployment ordering is a release-process concern, not a runtime concern.

## Out-of-Scope / Future

- Custom avatar uploads.
- Persistent identity across lobbies (would need accounts).
- Reactions / token animations on reveal.
- Non-creature token variety (Treasure, Clue, Food).
- A "shuffle pool" button in-app.

## Files Touched (Summary)

**New**
- `tools/fetch-tokens.ts`
- `src/assets/tokens.json` (generated, committed)
- `src/app/services/tokens.service.ts`
- `src/app/components/token-avatar/` (component + template + styles)
- `src/app/components/token-picker/` (component + template + styles)

**Modified**
- `src/app/models/protocol.ts` — add `tokenId` to `PlayerSummary`; add `pick_token` and `pick_rejected` variants.
- `infra/lambda/websocket-handler.ts` — handle `pick_token`, auto-assign on `start_card`, bundle `tokens.json`.
- `infra/lib/sussy-bingo-stack.ts` — CDK asset to include `tokens.json` in the Lambda bundle.
- `src/app/services/web-socket.service.ts` (or equivalent) — emit `pick_token`, handle `pick_rejected`.
- `src/app/pages/player/player.component.{ts,html,scss}` — embed `<app-token-picker>` in lobby phase.
- `src/app/pages/host/host.component.{ts,html,scss}` — render avatars in lobby tiles, leaderboard, and reveal rows.
- `package.json` — add `fetch-tokens` script.
