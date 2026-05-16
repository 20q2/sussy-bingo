# Hidden Placements + Reveal Power-up — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hide other players' token placements during an active quote round, and add a footer "Reveal" button players can press twice per session to peek at everyone's placements for the current quote.

**Architecture:** Pure client-side change inside the player view. The `placementsAt()` method in `PlayerComponent` gains a visibility filter keyed on a new `revealActive` flag and the existing `isRevealed` getter. A new footer element renders a button bound to `revealsRemaining` and a click handler that toggles `revealActive`. `revealActive` resets when a new quote arrives or when the host reveals the answer. No WebSocket messages, no service changes, no persistence.

**Tech Stack:** Angular 13, TypeScript 4.5, SCSS. No new dependencies.

**Spec:** [docs/superpowers/specs/2026-05-16-hidden-placements-reveal-powerup-design.md](../specs/2026-05-16-hidden-placements-reveal-powerup-design.md)

**Style guide:** [docs/style-guide.md](../../style-guide.md) — sticker recipe (cream paper, 3px ink outline, offset shadow, press-down on `:active`). Cursor rule: never use `cursor: not-allowed`, `cursor: wait`, or `cursor: progress`.

---

## File map

- **Modify**: `src/app/pages/player/player.component.ts` — add `revealsRemaining`, `revealActive`, reset hooks, `useReveal()` method, filter logic in `placementsAt()`.
- **Modify**: `src/app/pages/player/player.component.html` — add reveal footer below the card grid, inside the `state.phase === 'live'` block.
- **Modify**: `src/app/pages/player/player.component.scss` — footer + button styles, card-grid bottom padding so the footer doesn't cover the last row.

No new files. No tests (spec says manual only — component has no existing spec file).

---

## Task 1: Hide other players' live placements when round is active

**Files:**
- Modify: `src/app/pages/player/player.component.ts:132-157` (`placementsAt` method)

- [ ] **Step 1: Add component state for the power-up**

Add these two fields immediately after the `currentPick` field declaration in `PlayerComponent` (around line 22-24):

```typescript
/** Number of Reveal power-up charges remaining this session. Resets on reload. */
revealsRemaining = 2;
/** True for the duration of the current quote round if the player used a Reveal. */
revealActive = false;
```

- [ ] **Step 2: Filter non-self live placements in `placementsAt`**

Replace the body of `placementsAt` (lines 132-157) with this version. The only change is the first loop's condition — sticky placements still always show:

```typescript
placementsAt(row: number, col: number): Array<{ playerId: string; tokenId: string | null; ox: number; oy: number; rot: number; sticky: boolean }> {
  const out: Array<{ playerId: string; tokenId: string | null; ox: number; oy: number; rot: number; sticky: boolean }> = [];
  const seen = new Set<string>();
  const meId = this.state.me?.playerId ?? null;
  const showOthersLive = this.isRevealed || this.revealActive;
  // Live placements first (full opacity).
  for (const playerId of Object.keys(this.state.placements ?? {})) {
    const pos = this.state.placements[playerId];
    if (pos.row !== row || pos.col !== col) continue;
    if (playerId !== meId && !showOthersLive) continue;
    seen.add(playerId);
    const tokenId = this.state.players.find(p => p.playerId === playerId)?.tokenId ?? null;
    const scatter = this.chipScatter(playerId, row, col);
    out.push({ playerId, tokenId, ...scatter, sticky: false });
  }
  // Sticky chips from past correct rounds (reduced opacity), skipping me
  // (my correct cells show as green squares, not as my own token) and any
  // player who already has a live chip at this cell to avoid double-rendering.
  for (const [playerId, cells] of Object.entries(this.state.lockedCells)) {
    if (playerId === meId) continue;
    if (seen.has(playerId)) continue;
    if (!cells.some(([r, c]) => r === row && c === col)) continue;
    const tokenId = this.state.players.find(p => p.playerId === playerId)?.tokenId ?? null;
    const scatter = this.chipScatter(playerId, row, col);
    out.push({ playerId, tokenId, ...scatter, sticky: true });
  }
  return out;
}
```

- [ ] **Step 3: Verify the change compiles**

Run: `npm run build`
Expected: build succeeds with no TypeScript errors. Warnings are fine.

- [ ] **Step 4: Manual verification**

Run `npm start`, open two browsers (or two private windows) as separate players, host starts a game with a quote. Player A taps a cell. Confirm that Player B's view shows nothing on that cell. Confirm Player A still sees their own chip.

- [ ] **Step 5: Commit**

```bash
git add src/app/pages/player/player.component.ts
git commit -m "Hide other players' live placements during active round"
```

---

## Task 2: Reset `revealActive` on new quote / on reveal

**Files:**
- Modify: `src/app/pages/player/player.component.ts:82-87` (inside the `state$.subscribe` callback in `ngOnInit`)

- [ ] **Step 1: Track previous reveal state and clear `revealActive` on transitions**

In `ngOnInit`, the existing subscription block (around lines 82-87) clears `currentPick` and `highlightedName` when the quote index changes. Extend it so `revealActive` resets in two cases: (a) the quote index advanced, or (b) the answer just got revealed.

Modify lines 82-87. The current code is:

```typescript
      // Clear the pending pick and any highlight when the host moves to a new quote.
      if (s.currentQuote && s.currentQuote.index !== this.lastSeenQuoteIndex) {
        this.lastSeenQuoteIndex = s.currentQuote.index;
        this.currentPick = null;
        this.highlightedName = null;
      }
```

Replace with:

```typescript
      // Clear the pending pick and any highlight when the host moves to a new quote.
      // Also clear the Reveal power-up's per-round effect.
      if (s.currentQuote && s.currentQuote.index !== this.lastSeenQuoteIndex) {
        this.lastSeenQuoteIndex = s.currentQuote.index;
        this.currentPick = null;
        this.highlightedName = null;
        this.revealActive = false;
      }
      // Once the host reveals the answer for the current quote, the Reveal
      // power-up effect is moot (everyone is visible anyway). Clear it so the
      // button can be re-enabled cleanly on the next round without flicker.
      if (s.lastReveal && s.currentQuote && s.lastReveal.index === s.currentQuote.index) {
        this.revealActive = false;
      }
```

- [ ] **Step 2: Verify the change compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/player/player.component.ts
git commit -m "Reset Reveal power-up state on new quote and on host reveal"
```

---

## Task 3: Add the `useReveal()` click handler

**Files:**
- Modify: `src/app/pages/player/player.component.ts` (add method near other handlers, e.g. after `onChipTap` around line 213)

- [ ] **Step 1: Add the handler and a `canUseReveal` getter**

Insert these immediately after the `onChipTap` method (line 213). The getter consolidates the four button-disabled conditions so the template stays simple.

```typescript
/** True if the player can currently activate a Reveal: has charges, hasn't
 *  already revealed this round, and the host hasn't already revealed. */
get canUseReveal(): boolean {
  return this.revealsRemaining > 0
    && !this.revealActive
    && !this.isRevealed
    && this.state.phase === 'live'
    && !this.state.bingoWinners?.length;
}

useReveal(): void {
  if (!this.canUseReveal) return;
  this.revealsRemaining--;
  this.revealActive = true;
}
```

- [ ] **Step 2: Verify the change compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/player/player.component.ts
git commit -m "Add useReveal handler and canUseReveal guard"
```

---

## Task 4: Render the reveal footer button

**Files:**
- Modify: `src/app/pages/player/player.component.html` — insert the footer inside the `state.phase === 'live' && state.card` `<ng-container>` (the outer one starting at line 54), after the `card-grid` div (closes at line 106) and before the reveal-banner `<div>` (line 108).

- [ ] **Step 1: Insert the reveal footer markup**

Find the closing `</div>` of `.card-grid` (line 106) and the next `<div *ngIf="state.lastReveal && !state.bingoWinners?.length" class="reveal-banner"` (line 108). Insert this block between them:

```html
    <div class="reveal-footer">
      <button type="button"
              class="reveal-btn"
              [class.disabled]="!canUseReveal"
              [class.active]="revealActive"
              [attr.aria-disabled]="!canUseReveal"
              (click)="useReveal()">
        <span class="reveal-eye" aria-hidden="true">👁</span>
        <span class="reveal-label">
          <ng-container *ngIf="revealActive">Revealed</ng-container>
          <ng-container *ngIf="!revealActive">Reveal</ng-container>
        </span>
        <span class="reveal-count">{{ revealsRemaining }}</span>
      </button>
    </div>
```

Note: do NOT use the native `disabled` attribute — the project uses the `.disabled` class + `aria-disabled` so we can style without invoking the browser's default disabled cursor. The `(click)` handler already guards on `canUseReveal`.

- [ ] **Step 2: Verify the template compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/player/player.component.html
git commit -m "Render Reveal power-up footer button"
```

---

## Task 5: Style the reveal footer using the sticker recipe

**Files:**
- Modify: `src/app/pages/player/player.component.scss` — append a new block at the end of the file.

- [ ] **Step 1: Append the footer styles**

Append this to the end of `src/app/pages/player/player.component.scss`:

```scss
/* ===== Reveal power-up footer ===== */
.reveal-footer {
  display: flex;
  justify-content: center;
  margin: 0.25rem 0 1rem;
}
.reveal-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 1.1rem 0.55rem 0.9rem;
  background: var(--paper);
  color: var(--ink);
  border: 3px solid var(--ink);
  border-radius: 999px;
  box-shadow: 0 4px 0 var(--ink);
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  transition: background 150ms ease, transform 80ms ease, box-shadow 80ms ease, translate 80ms ease, opacity 150ms ease;
}
.reveal-btn:active:not(.disabled) {
  translate: 0 2px;
  box-shadow: 0 2px 0 var(--ink);
}
.reveal-btn.active {
  background: var(--accent-yellow);
}
.reveal-btn.disabled {
  opacity: 0.45;
  /* Standing project rule: never set cursor: not-allowed / wait / progress. */
  cursor: pointer;
}
.reveal-eye {
  font-size: 1.2rem;
  line-height: 1;
}
.reveal-count {
  background: var(--accent-yellow);
  color: var(--ink);
  border: 2px solid var(--ink);
  border-radius: 999px;
  padding: 0 0.5rem;
  font-size: 1.1rem;
  line-height: 1.3;
  min-width: 1.4em;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.reveal-btn.disabled .reveal-count {
  background: var(--paper-warm);
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Manual verification (end-to-end)**

Run `npm start`, open the player view in two browsers, host starts a game.

1. Player A taps a cell → Player B sees nothing on that cell. ✅
2. Player B taps the **Reveal** button (footer, count shows `2`) → Player B now sees Player A's chip on that cell. Button label becomes `Revealed`, background flips to yellow, count drops to `1`. ✅
3. Host reveals the answer → both players see all placements as expected (existing behavior unchanged). Reveal button label flips back to `Reveal` (revealActive cleared) but stays at count `1`. ✅
4. Host advances to next quote → Reveal button is clickable again, count still `1`, other players' new picks are hidden again. ✅
5. Player B uses their second Reveal → count drops to `0`, button gains `.disabled` class (visibly faded). Clicking it does nothing. ✅
6. Reload the player page → count is back to `2` (intentional — session-scoped). ✅
7. Confirm the disabled button does NOT show a `not-allowed`/`wait`/`progress` cursor in DevTools. ✅
8. Confirm the footer doesn't cover the last row of the bingo card on a small viewport. (If it does, the existing `.card-grid { margin-bottom: 1rem; }` plus the footer's own `margin: 0.25rem 0 1rem` should be enough; if not on your device, add bottom padding to `.card-grid` in this same file.)

- [ ] **Step 4: Commit**

```bash
git add src/app/pages/player/player.component.scss
git commit -m "Style Reveal power-up footer button"
```

---

## Done

All spec requirements implemented:
- ✅ Other players' live placements hidden until host reveal (Task 1)
- ✅ Sticky placements from past rounds still show (Task 1 — unchanged behavior)
- ✅ `revealsRemaining` starts at 2, decrements on use, resets on reload (Tasks 1, 3)
- ✅ `revealActive` resets on new quote and on host reveal (Task 2)
- ✅ Reveal button rendered in footer with count badge (Task 4)
- ✅ Disabled when 0 charges, already active, answer revealed, or game over (Task 3 `canUseReveal`)
- ✅ No `cursor: not-allowed`/`wait`/`progress` anywhere (Task 5)
- ✅ Sticker recipe styling (Task 5)
- ✅ No WebSocket messages, no service changes (purely local)
