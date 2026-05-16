# Sussy Bingo Style Guide

The visual language is *Jackbox-style party game, MTG-flavored*. Two screens, two registers:

- **Player phone** — bright, playful, hand-drawn. Cream paper + thick black outlines + marker fonts on a saturated party gradient.
- **Host TV** — dark, atmospheric, MTG-formal. Saturated radial glows on a deep navy backdrop, Beleren serif on headings, leaderboard + reveal animations.

Both views share the same CSS vars and the same chunky "press-down" button language, but they invert almost everything else.

## Color tokens

Defined in [`src/styles.scss`](../src/styles.scss).

### Global (both views)

| Variable | Value | Use |
|---|---|---|
| `--bg-deep` | `#1d2150` | Host TV background; player fallback `background-color` |
| `--bg-card` | `#2c3070` | Host card surfaces |
| `--bg-card-2` | `#3a3f8a` | Host secondary cards / inputs |
| `--border` | `#5258a8` | Host card borders / dividers |
| `--text-bright` | `#fefae0` | Host primary text |
| `--text-dim` | `#c5c9eb` | Host secondary text |

### Accents (shared)

| Variable | Value | Semantic |
|---|---|---|
| `--accent-yellow` | `#ffd166` | Primary CTA / highlight / brand |
| `--accent-green` | `#06d6a0` | Correct / locked-in / success |
| `--accent-red` | `#ef476f` | Incorrect / destructive |
| `--accent-blue` | `#4cc9f0` | Secondary action |
| `--accent-purple` | `#b18aff` | Brand secondary |
| `--accent-orange` | `#ff8c42` | Warm-side gradient stop |

### Player-only (defined on the `:host` of `player.component.scss`)

| Variable | Value | Use |
|---|---|---|
| `--paper` | `#fffaee` | Cream card surface |
| `--paper-warm` | `#fff1d0` | Cell "highlighted" tint |
| `--ink` | `#1a1330` | All borders, outlines, and text on cream/white |
| `--tile` | `#ffffff` | Bingo cell + chip surface |

**Rule:** never mix `--ink` with `--text-bright` in the same component. Player view is cream-on-bright; host view is bright-on-dark. They don't cross.

## Typography

Loaded in [`src/styles.scss`](../src/styles.scss). Three fonts, three jobs.

| Font | Role | Where |
|---|---|---|
| **Permanent Marker** | Ceremonial / loud / fun | Brand wordmark, `.welcome` / `.lobby-title` / `.connecting-title`, reveal banners, picker title ("Pick your avatar") |
| **Caveat** (700) | Body / playful | Cell names, possible-answer chips, name input, me-badge, dropped tokens' labels, reveal truth line |
| **Beleren** (local woff) | MTG ceremony | Host brand, host headings, host reveal moments. **Player view does not use Beleren** anymore — it reads as formal where we want casual |
| **Roboto** (system) | Chrome / metadata | Quote text, status pills, "tap name to filter" hints, host body copy |

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

Defined inline in [`host.component.scss`](../src/app/pages/host/host.component.scss):

```scss
background:
  radial-gradient(ellipse at top right, rgba(76, 201, 240, 0.14), transparent 60%),
  radial-gradient(ellipse at bottom left, rgba(239, 71, 111, 0.12), transparent 60%),
  var(--bg-deep);
```

Dark navy with subtle cyan/red glows. The TV is intentionally calm so the colored answer cards / leaderboard / reveal pulses can carry the visual energy.

## Component patterns

### `.sb-card` (global) — Player view override

The global `.sb-card` is a dark surface. The player view scopes an override that flips it to cream-paper-with-black-outline. See `.player .sb-card` block in `player.component.scss`. If you add new card surfaces inside the player view, give them class `sb-card` and they'll inherit the sticker treatment for free.

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
- **Host view changes need their own SCSS.** Player overrides are scoped under `.player ...`; they don't leak.
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
