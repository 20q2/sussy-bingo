# Sussy Bingo Style Guide

The visual language is *Jackbox-style party game, MTG-flavored*. Both screens — player phone and host TV — share the same bright sticker-book register:

- Cream paper surfaces on a saturated orange→pink→purple party gradient
- 3px ink-black outlines and flat offset shadows on every interactive surface
- Permanent Marker for ceremony/loud, Caveat for body/playful, near-black `--ink` on cream

The host view is just a wider, leaderboard-equipped layout of the same sticker language — not a separate dark register.

## Color tokens

Defined in [`src/styles.scss`](../src/styles.scss).

### Global (both views)

| Variable | Value | Use |
|---|---|---|
| `--bg-deep` | `#1d2150` | Body fallback only — neither view uses this as a primary surface anymore |
| `--bg-card` | `#2c3070` | (legacy) |
| `--bg-card-2` | `#3a3f8a` | (legacy) |
| `--border` | `#5258a8` | (legacy) |
| `--text-bright` | `#fefae0` | (legacy) |
| `--text-dim` | `#c5c9eb` | (legacy) |

### Accents (shared)

| Variable | Value | Semantic |
|---|---|---|
| `--accent-yellow` | `#ffd166` | Primary CTA / highlight / brand |
| `--accent-green` | `#06d6a0` | Correct / locked-in / success |
| `--accent-red` | `#ef476f` | Incorrect / destructive |
| `--accent-blue` | `#4cc9f0` | Secondary action |
| `--accent-purple` | `#b18aff` | Brand secondary |
| `--accent-orange` | `#ff8c42` | Warm-side gradient stop |

### Sticker palette (defined on the `:host` of both `player.component.scss` and `host.component.scss`)

| Variable | Value | Use |
|---|---|---|
| `--paper` | `#fffaee` | Cream card surface |
| `--paper-warm` | `#fff1d0` | Cell "highlighted" tint |
| `--ink` | `#1a1330` | All borders, outlines, and text on cream/white |
| `--tile` | `#ffffff` | Bingo cell, chip, answer-card surface |

**Rule:** don't reach for `--text-bright`/`--bg-card` anywhere in the active app. Both views are ink-on-cream.

## Typography

Loaded in [`src/styles.scss`](../src/styles.scss). Three fonts, three jobs.

| Font | Role | Where |
|---|---|---|
| **Permanent Marker** | Ceremonial / loud / fun | Brand wordmark (both views), `.welcome` / `.lobby-title` / `.connecting-title` / `.leaderboard-title`, reveal banners, primary action buttons on host, picker title |
| **Caveat** (700) | Body / playful | Cell names, answer cards, possible-answer chips, name input, me-badge, leaderboard rows, lobby player tiles, host icon buttons |
| **Beleren** (local woff) | MTG fallback | Kept loaded as a fallback for `'Permanent Marker'`. Not used as a primary face — Beleren is all-caps and strips case/punctuation flavor out of quoted text. |
| **Roboto** (system) | Chrome / metadata / quote voice | Status pills, "tap name to filter" hints, ✓ glyph, and the host `.big-quote` itself (italic, weight 500) — preserves case and punctuation so quote flavor survives. |

### Rule of thumb

> If it's a *thing the player chose* or a *celebratory moment*, use a marker font. If it's *the system talking to the player*, use Roboto/Beleren.

## The "sticker" recipe (player view)

Every interactive surface on the player view shares this recipe so the whole screen feels cut-and-glued from paper:

```scss
background: var(--paper);       /* or var(--tile) for the brighter "label" */
color: var(--ink);
border: 3px solid var(--ink);
border-radius: 14–18px;
box-shadow: 0 4–6px 0 var(--ink);
```

On `:active`, the element presses down 2–3px and the shadow collapses to `0 1px 0 var(--ink)`. Buttons, cells, chips, me-badge, modal cards — same recipe everywhere. This consistency is the point.

Avatars get the same treatment via `outline: 3px solid var(--ink); outline-offset: -3px;` (we use `outline` not `border` so circles stay circular).

## Backgrounds

### Player

Layered gradient on `.player` ([`player.component.scss`](../src/app/pages/player/player.component.scss)):

```scss
background:
  repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 14px, transparent 14px 28px),
  radial-gradient(circle at top right, rgba(255, 209, 102, 0.4), transparent 55%),
  radial-gradient(circle at bottom left, rgba(76, 201, 240, 0.35), transparent 55%),
  linear-gradient(160deg, #ff8c42, #ef476f 45%, #b18aff);
```

Orange → pink → purple base, sun-glow at top-right (yellow), cyan glow at bottom-left, faint diagonal stripe overlay. This is fixed — every player session sees the same warm gradient.

### Host

Same warm gradient as the player, defined inline in [`host.component.scss`](../src/app/pages/host/host.component.scss). The host adds `background-attachment: fixed` so the gradient sits still while the page scrolls — matching the player feel on a larger surface.

## Component patterns

### `.sb-card` (global) — Sticker override in both views

The global `.sb-card` is still defined as a dark surface for legacy reasons, but both `.player` and `.host` scope an override that flips it to cream-paper-with-black-outline + offset shadow. New card surfaces inside either view should use class `sb-card` and inherit the sticker treatment for free.

### `.sb-pill` (global)

Subtle pill with a colored status dot — never solid-filled chunky. Variants: `.live`, `.lobby`, `.unknown`. Used for connection/phase status. On the player view, the LIVE pill is *replaced* by `.me-badge` to keep the header useful.

### `.me-badge` (player live header)

Avatar + name + score pill. Always visible during the live phase so the player stays anchored. Score pill is yellow with black outline; numerals tabular for stable width.

### `.token-tile` (picker)

Each tile in the avatar picker is just a token avatar + name label. The avatar carries the sticker styling (outline + shadow). `mine` variant adds a yellow outline and triggers the `token-spring` keyframe. `taken` is 35% opacity + grayscale and `pointer-events: none`.

### `.cell` (bingo grid)

White (`--tile`) tile, 3px ink outline, 4px offset shadow. Caveat font on the name. Three states overlay:

- `.you-guessed` — yellow background + pulse animation (currently locked-in cell)
- `.correct` — green background + `cell-correct-pop` keyframe
- `.incorrect` — red background + `cell-incorrect-shake` keyframe
- `.is-truth` — green outline ring (every cell containing the revealed name)
- `.highlighted` — warm-cream tint (tap-name-to-filter)

Each cell has a slight per-position tilt (`--tilt`) so the grid feels hand-laid.

### `.possible-chip` (quote answer chips)

Caveat-font pill, white tile background, 3px ink outline. Two states:

- `.highlighted` — yellow (filter spotlight, set by tapping the chip)
- `.locked` — green with leading `✓` (the player's committed guess; takes precedence over highlighted)

### `.placements .dropped` (token drops)

When a player taps a cell, their avatar drops in via `chip-drop` keyframe (gravity bounce). Position within the cell uses CSS vars `--chip-ox`, `--chip-oy`, `--chip-rot` set per-(player, row, col) by `chipStyle()` in `player.component.ts` — deterministic hash of the playerId + cell so multiple tokens scatter naturally instead of stacking.

## Animations (player view)

All defined in `player.component.scss`.

| Keyframe | Use |
|---|---|
| `token-drop` / `chip-drop` | Avatar dropping onto a cell |
| `reveal-pop` | Reveal banner enters with overshoot |
| `win-glow` | Green ring pulse on correct reveal banner |
| `lose-shake` | Reveal banner shakes on incorrect |
| `cell-correct-pop` | Cell scales up with green ring on correct reveal |
| `cell-incorrect-shake` | Cell jitters on incorrect reveal |
| `pulse` | The currently-tapped (not-yet-revealed) cell |
| `waiting-pulse` | Yellow dot on the "Waiting for next quote…" card |
| `token-spring` | Picker tile bouncing when you claim an avatar |
| `spin` | Connecting spinner |

## Authoring rules

- **Outlines, not borders, on circles.** `border-radius: 50%` + `border` clips weird; use `outline` + negative offset.
- **Shadows are flat, not blurred.** The offset shadow `0 4px 0 var(--ink)` is the design signature; don't add `blur` to it.
- **Tilts are subtle.** ±0.5° to ±2° on cells, slightly larger on dropped tokens. Never ±5°+; it stops feeling intentional.
- **One playful font per element, max.** Don't mix Permanent Marker with Caveat on the same line.
- **Scope view-specific overrides under `.player` or `.host`.** Both views speak the same sticker language but have different layouts, so component sizing/spacing should stay scoped per view.
- **New player-view components should follow the sticker recipe.** Cream paper + black outline + offset shadow + press-down on active. Anything else will look out of place.

## File map

- [`src/styles.scss`](../src/styles.scss) — Global tokens, fonts, `.sb-button`, `.sb-card`, `.sb-pill`
- [`src/app/pages/player/player.component.scss`](../src/app/pages/player/player.component.scss) — Player-view-scoped Quiplash overrides, animations, layout
- [`src/app/pages/host/host.component.scss`](../src/app/pages/host/host.component.scss) — Host TV view styling
- [`src/app/components/token-picker/token-picker.component.scss`](../src/app/components/token-picker/token-picker.component.scss) — Picker grid + sticker avatars
- [`src/app/components/token-avatar/token-avatar.component.scss`](../src/app/components/token-avatar/token-avatar.component.scss) — Bare circular avatar (no outlines — outlines are applied by parents per context)
- [`src/assets/beleren.woff`](../src/assets/beleren.woff) — MTG ceremonial font
- [`src/assets/tokens.json`](../src/assets/tokens.json) — Curated Scryfall token art for avatars
- [`src/assets/backgrounds/`](../src/assets/backgrounds/) — MTG land art (currently unused since player switched to the gradient; kept around for possible future use)
