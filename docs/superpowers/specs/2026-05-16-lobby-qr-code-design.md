# Lobby QR Code — Design

## Goal

Make it easier for players to join from their phones by adding a QR code to the host's "Waiting for players" lobby. Scanning the code opens the player join screen (`/play`) directly.

## Scope

- New visual element: QR code + URL caption inside the existing `lobby-hero` block of `HostComponent`, visible only during `state.phase === 'lobby'`.
- Replaces the existing `<li>` placeholder text `Open /play on your phone to join…` (host.component.html:38), which becomes redundant once the URL is visible above the player tiles.
- No changes to the player flow, the WebSocket protocol, or anything outside `HostComponent`.

## Approach

### Dependency

Add `qrcode` (npm, MIT, ~50KB, no runtime deps) to `dependencies` in `package.json`. It exposes a `toCanvas(canvas, text, opts)` API that renders synchronously and works in Angular 13 without a wrapper.

### URL construction

Compute the join URL once on the host component:

```ts
this.joinUrl = new URL('play', document.baseURI).toString();
```

This resolves to:
- `http://localhost:4200/play` in dev
- `https://20q2.github.io/sussy-bingo/play` on gh-pages

`document.baseURI` honors the `<base href>` Angular injects, so we don't need to special-case deployment.

### Rendering

- Add `@ViewChild('qrCanvas') qrCanvas?: ElementRef<HTMLCanvasElement>;` and `joinUrl: string` to `HostComponent`.
- In `ngAfterViewInit` (and whenever the lobby block first appears, since `*ngIf` may delay creation), call `QRCode.toCanvas(this.qrCanvas.nativeElement, this.joinUrl, { width: 220, margin: 1, errorCorrectionLevel: 'M' })`.
- To handle the `*ngIf="state.phase === 'lobby'"` case (the canvas isn't in the DOM until phase transitions to `lobby`), render the QR via a small helper that runs from a template `*ngIf` trigger — simplest version: bind `#qrCanvas` and call the helper inside an `(window:resize)` or `ngAfterViewChecked` guarded by a "rendered already" flag. Implementation detail to nail down in the plan.

### Template

Inside `host.component.html` lobby block, between the `lobby-title` and the `lobby-sub`:

```html
<div class="lobby-qr">
  <canvas #qrCanvas class="lobby-qr-canvas" width="220" height="220"></canvas>
  <p class="lobby-qr-caption">Scan to join — or open <strong>{{ joinUrl }}</strong></p>
</div>
```

Remove the now-redundant placeholder list item (host.component.html:38). When `state.players.length === 0`, the QR + caption carry the "how to join" message on their own.

### Styling

Add to `host.component.scss` matching the existing sticker recipe from `docs/style-guide.md`:

- `.lobby-qr` — centered flex column, ~24px top/bottom margin.
- `.lobby-qr-canvas` — cream background (`#fdf6e3`-ish to match `.sb-card`), 3px ink outline, 6px offset shadow, ~12px inner padding so the QR quiet-zone isn't flush with the border.
- `.lobby-qr-caption` — same body font as `.lobby-sub`, slightly smaller, URL in monospace bold.

No press-down animation (it's not interactive).

## Components / Data Flow

- `HostComponent` owns the `joinUrl` string and the canvas ref.
- One-time render on lobby entry. No re-render needed — the URL is static for the session.
- No new services, no protocol changes, no router work.

## Error handling

`QRCode.toCanvas` can throw if the input is empty or the canvas is missing. Wrap in a try/catch and `console.warn` on failure; the URL caption underneath still gives players a way to join, so a silent fallback is acceptable.

## Testing

- Manual: run `npm start`, navigate to the host page in `lobby` phase, scan the QR with a phone — confirm it lands on `/play`.
- Manual: build with `npm run build`, sanity check the gh-pages base href resolves to `https://20q2.github.io/sussy-bingo/play` in the rendered QR.
- No unit test needed; the logic is one URL-construction line and a library call.

## Out of scope

- Re-rendering the QR if the page is resized or the base href changes mid-session.
- Showing the QR anywhere outside the lobby phase (e.g., during a live game for late joiners).
- Branding/logo overlay in the center of the QR.
