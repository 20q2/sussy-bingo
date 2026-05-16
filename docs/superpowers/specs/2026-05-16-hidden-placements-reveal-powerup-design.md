# Hidden placements + Reveal power-up

## Problem

On the player view, every player's token placements are visible to every other player as soon as they're made. This leaks information: players can copy each other's guesses, and there's no individual commitment to a pick. We want guesses to be private until the host reveals the answer, while still giving players a deliberate "peek" tool for high-stakes rounds.

## Goals

1. During an active quote round, a player sees only their own pending placement. Other players' live placements are hidden.
2. Once the host reveals the answer, all placements for that round become visible (existing behavior — frozen "sticky" marks already work this way).
3. Each player gets a **Reveal** power-up they can use **twice per game session** to temporarily unhide other players' placements for the current quote round only.

## Non-goals

- No server-side enforcement of the 2-per-game limit. This is honor-system / trust-based (matches Jackbox party-game feel).
- No notification to other players when someone uses a Reveal.
- No persistence of `revealsRemaining` across page reloads. A reload = new game session.
- No changes to the host/TV view.

## Design

### Hiding other players' live placements

`placementsAt(row, col)` in [src/app/pages/player/player.component.ts:153](src/app/pages/player/player.component.ts#L153) currently returns both live placements (non-sticky, from in-progress rounds) and sticky placements (frozen post-reveal marks).

Change: filter out **non-self, non-sticky** placements unless one of these is true:
- `this.answerRevealed` is true (round is over — show everyone), OR
- `this.revealActive` is true (this player used their power-up this round).

Self placements always show regardless. Sticky placements always show (they belong to completed rounds).

### Reveal power-up state

Add to `PlayerComponent`:

- `revealsRemaining: number = 2`
- `revealActive: boolean = false`

`revealActive` must reset to `false` when either:
- `currentQuoteIndex` advances to a new round, OR
- The host reveals the answer (the power-up's effect is no longer meaningful — everyone is visible anyway).

The existing reactive flow that updates state on incoming WebSocket messages is the right place to hook this. Whichever observer detects a new quote / reveal also clears `revealActive`.

### Button

A fixed footer bar at the bottom of the player view, containing one button.

Label states:
- `Reveal (2)` / `Reveal (1)` — clickable
- `Reveal (0)` — disabled (out of charges)
- Also disabled when `revealActive === true` (already revealed this round) or `answerRevealed === true` (pointless — everyone visible).

Click handler:
1. Guard: bail if `revealsRemaining <= 0 || revealActive || answerRevealed`.
2. `revealsRemaining--`
3. `revealActive = true`
4. No WebSocket message sent.

### Styling

Footer bar and button follow the sticker recipe from [docs/style-guide.md](docs/style-guide.md):
- Cream paper background
- 3px ink outline
- Offset drop shadow
- Press-down transform on `:active`

Disabled state: reduced opacity. **Do not use** `cursor: not-allowed`, `cursor: wait`, or `cursor: progress` anywhere — this is a standing project rule.

The footer should not obscure the bottom row of the bingo card. Add bottom padding to the card container equal to the footer height, or use a sticky footer pattern consistent with the rest of the player view.

## Testing

No unit tests. The player component has no existing spec file and this is a localized UI behavior change. Manual test plan:

1. Open two player clients in one session.
2. Player A clicks a square → Player B should see nothing on that square.
3. Player B clicks Reveal → Player B should now see Player A's placement on that square.
4. Host reveals answer → both players see all placements (sticky).
5. Advance to next quote → Reveal button label drops to `Reveal (1)` and is clickable again. Player B's `revealActive` is back to false.
6. After 2 uses, button is disabled at `Reveal (0)`.
7. Reload the page → counter resets to 2 (acceptable — new session).

## Files touched

- [src/app/pages/player/player.component.ts](src/app/pages/player/player.component.ts) — state, filter logic in `placementsAt`, click handler, reset hooks.
- [src/app/pages/player/player.component.html](src/app/pages/player/player.component.html) — footer + button markup.
- [src/app/pages/player/player.component.scss](src/app/pages/player/player.component.scss) — footer + button styles, card bottom padding.
