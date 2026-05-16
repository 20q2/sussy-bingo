# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` / `ng serve` — dev server at http://localhost:4200/
- `npm run build` — production build into `dist/`
- `npm run watch` — incremental dev build
- `npm test` — run Karma + Jasmine unit tests (`*.spec.ts`); use `ng test --include='**/foo.spec.ts'` to run a single spec
- `npm run deploy` — deploys to GitHub Pages (`https://20q2.github.io/sussy-bingo/`) via `angular-cli-ghpages`

Angular CLI 13.3.x / TypeScript 4.5. Node 20.x.

## Style / design system

See [`docs/style-guide.md`](docs/style-guide.md) for the visual language: color tokens, fonts, the "sticker recipe" (cream paper + 3px ink outline + offset shadow + press-down) used across the player view, the Quiplash-style component patterns, and authoring rules. Read this before touching anything in `src/app/pages/player/`, `src/app/components/token-*/`, or `src/styles.scss`.

## Architecture

Angular 13 single-page app. Despite the multiple folders, almost all logic lives in one component (`src/app/app.component.ts`) and the routing is trivial — `''` and `/home` both render `AppComponent`.

### Data flow

1. **Ingest**: `ngOnInit` → `ingestFile()` HTTP-GETs `assets/ingest_file.txt`, a Discord-style chat log of quotes.
2. **Parse**: `regexData()` extracts `"quote" - name` pairs with a regex. Only quotes whose author appears in `nickNameMap` are kept.
3. **Normalize**: `generateStats()` cleans names (strips `(edited)`, leading `- `, case). `collapseStats()` folds the dozens of nickname variants in `nickNameMap` down to canonical people (Connor, Andrew, Shipley, …) and produces `compiledPersonTotals`.
4. **Bingo card**: `generateCard()` builds a weighted loot table from `compiledPersonTotals` and rolls a `cardWidth × cardHeight` (default 5×5) grid of names. The user clicks squares to "guess" who said the current quote.
5. **Word cloud mode**: `loseMyselfInTheCloud()` tokenizes quotes (minus `noNoWords` stopwords) into the `WordCloudComponent` (`angular-d3-cloud` / `d3-cloud`).

### Multiplayer sync

`WebSocketService` connects to a hardcoded AWS API Gateway WebSocket (`wss://3i2b1n43s9.execute-api.us-east-1.amazonaws.com/production/`). Two message types flow through `messages$`:

- `quote` — server broadcasts the current quote + index + possible answers; clients advance their `currentQuoteIndex`. If a client is behind, `onThisOneIsNotOnMyCard()` inserts a placeholder so indices stay aligned.
- `answer` — server reveals the true author; clients mark their `clickedBingoSquared` entry as correct (1) / incorrect (-1).

Index alignment between server quote index and local `clickedBingoSquaredIndex` is load-bearing — `onItemClick` refuses clicks when out of sync. `app.component.ts` also defines `BingoItem`, `Quote`, `ServerMessage`, `ClickedBingoSquared` inline (not exported types).

### `appMode`

Single string field on `AppComponent` switches the template between `'default'`, `'card'`, `'quote'`, and `'cloud'` views. There are no separate routed pages.

### Other pieces

- `services/bingo.service.ts`, `services/sns.service.ts` — present but check before assuming they're wired in.
- `components/word-cloud/` — d3-cloud wrapper. `components/error-page/` — error route component.
- `pipes/dots-pipe.pipe.ts` — text pipe used in templates.
- `assets/backgrounds/` — MTG-land-themed background images selected randomly in `assignBackground()` (1-in-21 chance of `wastes.png` easter egg).

### Things to know before editing

- `package.json` contains junk/placeholder deps (`angular@1.8.3`, `vim`, `nodejs`, `ng@0.0.0`, `git-cli`) — don't treat their presence as meaningful; the real stack is Angular 13 + Material + CDK + d3-cloud + AWS SDK.
- `dist/` is committed (gh-pages workflow). The current branch is `gh-pages`; `main` is the source branch.
- The WebSocket URL is hardcoded in `app.component.ts:106`. No environment config is wired up for it.

## Infra (`infra/`)

CDK app that stands up the game's backend: API Gateway WebSocket + Lambda relay + DynamoDB connection table. Brought up before a game session and torn down after.

- `cd infra && npm run deploy` — deploys `SussyBingoStack`, outputs `WebSocketUrl`
- Paste that URL into `src/app/app.component.ts:106` and redeploy the gh-pages frontend
- `cd infra && npm run destroy` — tears everything down (DynamoDB table is `RemovalPolicy.DESTROY`)

One Lambda (`infra/lambda/websocket-handler.ts`) handles all three routes. `$default` parses the client's `{body: <payload>}` wrapper, re-wraps as `{message: <payload>}`, and fan-outs to every connection except the sender; `410 Gone` responses cause the connection row to be deleted.
