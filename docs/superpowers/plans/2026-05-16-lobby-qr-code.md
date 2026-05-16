# Lobby QR Code Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show a scannable QR code (pointing to `/play`) on the host's "Waiting for players" lobby so players can join from their phones.

**Architecture:** Add the `qrcode` npm package, compute the join URL from `document.baseURI`, and render to a `<canvas>` inside the existing `lobby-hero` block in `HostComponent` using `@ViewChild` + `ngAfterViewInit`-style logic. Style the canvas as a sticker card to match the rest of the host page.

**Tech Stack:** Angular 13, TypeScript 4.5, `qrcode` (npm), SCSS.

---

## File Structure

- **Modify:** `package.json` — add `qrcode` dependency + `@types/qrcode` devDependency.
- **Modify:** `src/app/pages/host/host.component.ts` — add `joinUrl`, `@ViewChild` canvas ref, render logic.
- **Modify:** `src/app/pages/host/host.component.html` — insert QR block; remove redundant placeholder `<li>`.
- **Modify:** `src/app/pages/host/host.component.scss` — add `.lobby-qr*` styles.

---

### Task 1: Install qrcode dependency

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

Run from repo root:

```bash
npm install qrcode@^1.5.3
npm install --save-dev @types/qrcode@^1.5.5
```

- [ ] **Step 2: Verify install**

Expected: `package.json` now contains `"qrcode": "^1.5.3"` under `dependencies` and `"@types/qrcode": "^1.5.5"` under `devDependencies`. `node_modules/qrcode/lib/browser.js` exists.

- [ ] **Step 3: Confirm the build still passes**

Run: `npm run build`
Expected: build completes without errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "Add qrcode dependency for lobby QR"
```

---

### Task 2: Add joinUrl + canvas ref + render to HostComponent

**Files:**
- Modify: `src/app/pages/host/host.component.ts`

- [ ] **Step 1: Add imports and ViewChild**

At the top of `host.component.ts`, change the `@angular/core` import to include `AfterViewChecked`, `ElementRef`, and `ViewChild`:

```ts
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
```

Add the `qrcode` import below the existing imports:

```ts
import QRCode from 'qrcode';
```

- [ ] **Step 2: Update the class declaration**

Change:

```ts
export class HostComponent implements OnDestroy, OnInit {
```

to:

```ts
export class HostComponent implements OnDestroy, OnInit, AfterViewChecked {
```

- [ ] **Step 3: Add the joinUrl, canvas ref, and render-guard fields**

Inside the class body, near the other public fields (after `ingestReady = false;` at host.component.ts:43), add:

```ts
@ViewChild('qrCanvas') qrCanvas?: ElementRef<HTMLCanvasElement>;
readonly joinUrl = new URL('play', document.baseURI).toString();
private qrRendered = false;
```

- [ ] **Step 4: Implement ngAfterViewChecked to render the QR when the canvas appears**

Add this method to the class (it can go below `ngOnInit`):

```ts
ngAfterViewChecked(): void {
  if (this.qrRendered) return;
  const canvas = this.qrCanvas?.nativeElement;
  if (!canvas) return;
  this.qrRendered = true;
  QRCode.toCanvas(canvas, this.joinUrl, {
    width: 220,
    margin: 1,
    errorCorrectionLevel: 'M',
  }).catch(err => {
    this.qrRendered = false;
    console.warn('[host] QR render failed', err);
  });
}
```

Note: `qrRendered` is intentionally not reset when the phase leaves `lobby`. The URL is static for the session, so re-rendering on subsequent lobby visits is unnecessary, and `@ViewChild` will repopulate `qrCanvas` if the user clears the lobby and returns.

- [ ] **Step 5: Verify the file compiles**

Run: `npm run build`
Expected: build completes without TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/pages/host/host.component.ts
git commit -m "Wire QR render into HostComponent"
```

---

### Task 3: Add the QR block to the lobby template; remove redundant placeholder

**Files:**
- Modify: `src/app/pages/host/host.component.html`

- [ ] **Step 1: Insert the QR block inside `.lobby-hero`**

Find host.component.html:29-32:

```html
<div class="lobby-hero">
  <h2 class="lobby-title">Waiting for players</h2>
  <p class="lobby-sub">{{ state.players.length }} {{ state.players.length === 1 ? 'player has' : 'players have' }} joined</p>
</div>
```

Replace it with:

```html
<div class="lobby-hero">
  <h2 class="lobby-title">Waiting for players</h2>
  <div class="lobby-qr">
    <canvas #qrCanvas class="lobby-qr-canvas" width="220" height="220"></canvas>
    <p class="lobby-qr-caption">
      Scan to join — or open <strong>{{ joinUrl }}</strong>
    </p>
  </div>
  <p class="lobby-sub">{{ state.players.length }} {{ state.players.length === 1 ? 'player has' : 'players have' }} joined</p>
</div>
```

- [ ] **Step 2: Remove the now-redundant placeholder `<li>`**

Find host.component.html:38:

```html
<li *ngIf="!state.players.length" class="placeholder">Open <strong>/play</strong> on your phone to join…</li>
```

Delete that line entirely. The surrounding `<ul class="player-tiles">` and its `<li *ngFor>` stay as-is.

- [ ] **Step 3: Verify the template compiles**

Run: `npm run build`
Expected: build completes without template errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/pages/host/host.component.html
git commit -m "Show QR code in lobby; drop redundant placeholder"
```

---

### Task 4: Style the QR block as a sticker card

**Files:**
- Modify: `src/app/pages/host/host.component.scss`

- [ ] **Step 1: Append the QR styles**

At the bottom of `host.component.scss`, add:

```scss
/* ===== Lobby QR ===== */
.lobby-qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  margin: 1.25rem auto 0.25rem;
}
.lobby-qr-canvas {
  background: var(--paper);
  border: 3px solid var(--ink);
  border-radius: 14px;
  box-shadow: 0 6px 0 var(--ink);
  padding: 12px;
  /* Keep the canvas at its intrinsic 220px so the QR stays crisp */
  width: 220px;
  height: 220px;
  box-sizing: content-box;
}
.lobby-qr-caption {
  margin: 0;
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--ink);
  opacity: 0.85;
  text-align: center;
}
.lobby-qr-caption strong {
  font-family: 'JetBrains Mono', 'Menlo', monospace;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
}
```

- [ ] **Step 2: Verify the build still passes**

Run: `npm run build`
Expected: build completes without SCSS errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/host/host.component.scss
git commit -m "Style lobby QR as sticker card"
```

---

### Task 5: Manual verification

**Files:** (none modified)

- [ ] **Step 1: Start the dev server**

Run: `npm start`
Expected: server up at `http://localhost:4200/`.

- [ ] **Step 2: Open the host page in a browser**

Navigate to `http://localhost:4200/host` (or whatever route renders `HostComponent` — confirm with `src/app/app-routing.module.ts` if unsure). Wait for `state.phase === 'lobby'` (the "Waiting for players" screen).

Expected:
- A 220×220 QR code is visible inside the cream sticker frame between the title and the "X players have joined" subline.
- The caption below reads: `Scan to join — or open http://localhost:4200/play` (URL in monospace).
- The "Open /play on your phone to join…" placeholder no longer appears when there are 0 players.

- [ ] **Step 3: Scan the QR with a phone**

Open the camera on a phone (on the same network as the dev box, or just scan with any device that can resolve the URL — e.g., screenshot the QR and decode it with an online tool if you don't have a same-network setup).

Expected: scanning resolves to `http://localhost:4200/play` (dev) or `https://20q2.github.io/sussy-bingo/play` (gh-pages after deploy).

- [ ] **Step 4: Sanity-check the gh-pages URL**

Run: `npm run build`
Open `dist/sussy-bingo/index.html` in the browser (or inspect the built output). The `joinUrl` in `HostComponent` will resolve at runtime against `<base href="/sussy-bingo/">`, so the scanned URL on production becomes `https://20q2.github.io/sussy-bingo/play`. No further action required if the dev scan worked.

- [ ] **Step 5: Confirm completion**

If steps 2–4 all match expectations, the feature is done. No commit needed for this verification task.

---

## Notes for the implementing engineer

- **No unit tests** for this feature. The only logic is one URL-construction line and a single library call; the spec explicitly opts out (`docs/superpowers/specs/2026-05-16-lobby-qr-code-design.md` § Testing). Don't add Karma specs just to add them.
- **Don't refactor** the lobby-hero structure beyond what's specified. The surrounding `state.phase === 'lobby'` block, `player-tiles` list, and `lobby-actions` row stay unchanged.
- **Style guide:** the QR sticker uses the same recipe as `.sb-card` — cream paper, 3px ink border, 6px offset shadow. See `docs/style-guide.md` if you need to adjust hues.
- **Don't bump the app version** in this PR unless the user asks; the version-bump skill is a separate trigger.
