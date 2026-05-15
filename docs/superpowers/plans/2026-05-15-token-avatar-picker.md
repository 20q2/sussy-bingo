# Token Avatar Picker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Jackbox-style player avatar picker to the lobby, where each player claims a unique MTG token avatar (sourced from Scryfall) that surfaces in the lobby, leaderboard, reveal screen, and host view.

**Architecture:** A one-off Node script (`tools/fetch-tokens.ts`) queries Scryfall and writes `tokens.json` to both `src/assets/` (consumed by Angular) and `infra/lambda/` (bundled into the Lambda by esbuild). The protocol gains a nullable `tokenId` field on `PlayerSummary`, a new `pick_token` client message, and a `pick_rejected` server message. The server validates picks against the token pool and enforces per-lobby uniqueness; the frontend renders a grid picker in the lobby and a circular avatar component everywhere a player is identified visually.

**Tech Stack:** Angular 13 + TypeScript 4.5, AWS Lambda (Node 20) + DynamoDB + API Gateway WebSockets, CDK v2, Karma/Jasmine (frontend tests), Jest (Lambda tests), Scryfall public REST API (via build-time script only).

**Spec:** [docs/superpowers/specs/2026-05-15-token-avatar-picker-design.md](../specs/2026-05-15-token-avatar-picker-design.md)

---

## File Structure Overview

**New files:**
- `tools/fetch-tokens.ts` — Scryfall query/curation script
- `tools/tsconfig.json` — minimal TS config for the script
- `src/assets/tokens.json` — committed pool consumed by the frontend
- `infra/lambda/tokens.json` — same content, bundled into Lambda
- `src/app/services/tokens.service.ts` — frontend pool loader
- `src/app/services/tokens.service.spec.ts`
- `src/app/components/token-avatar/token-avatar.component.{ts,html,scss}`
- `src/app/components/token-avatar/token-avatar.component.spec.ts`
- `src/app/components/token-picker/token-picker.component.{ts,html,scss}`
- `src/app/components/token-picker/token-picker.component.spec.ts`
- `infra/lambda/handlers/pickToken.ts`
- `infra/lambda/__tests__/pickToken.test.ts`

**Modified files:**
- `package.json` — add `fetch-tokens` script
- `src/app/models/protocol.ts` — augment `PlayerSummary`, add `pick_token` and `pick_rejected` variants
- `infra/lambda/protocol.ts` — same augmentation (the Lambda has its own protocol copy)
- `infra/lambda/state.ts` — add `tokenId` to `PlayerRow`, persist + read it
- `infra/lambda/handler.ts` — dispatch `pick_token`
- `infra/lambda/handlers/join.ts` — include `tokenId` in `PlayerSummary` broadcasts
- `infra/lambda/handlers/startCard.ts` — auto-assign random unused tokens to any null-tokenId players before broadcasting
- `infra/lambda/handlers/hostHello.ts` — include `tokenId` in `PlayerSummary` (verify)
- `src/app/services/game-state.service.ts` — `PlayerSummary` change flows through; handle `pick_rejected`
- `src/app/app.module.ts` — declare `TokenAvatarComponent`, `TokenPickerComponent`
- `src/app/pages/player/player.component.{ts,html}` — embed picker in lobby phase
- `src/app/pages/host/host.component.{ts,html,scss}` — render avatars in lobby tiles, leaderboard, reveal row

---

## Task 1: Generate the token pool (curation script)

**Files:**
- Create: `tools/fetch-tokens.ts`
- Create: `tools/tsconfig.json`
- Modify: `package.json`
- Create (by running the script): `src/assets/tokens.json`, `infra/lambda/tokens.json`

- [ ] **Step 1: Create `tools/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["**/*.ts"]
}
```

- [ ] **Step 2: Write `tools/fetch-tokens.ts`**

```ts
import * as fs from 'fs';
import * as path from 'path';

interface ScryfallCard {
  id: string;
  name: string;
  artist?: string;
  image_uris?: { art_crop?: string };
}
interface ScryfallPage {
  data: ScryfallCard[];
  has_more: boolean;
  next_page?: string;
}

interface TokenEntry {
  id: string;
  name: string;
  artist: string;
  artCropUrl: string;
}

const QUERY =
  'type:token+type:creature+frame:2015+game:paper+-is:reprint';
const TARGET = 50;
const SLEEP_MS = 100;
const UA = 'sussy-bingo-token-fetcher/1.0 (https://github.com/20q2/sussy-bingo)';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function fetchPage(url: string): Promise<ScryfallPage> {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Scryfall ${res.status} for ${url}`);
  return res.json() as Promise<ScryfallPage>;
}

async function main(): Promise<void> {
  const base =
    `https://api.scryfall.com/cards/search?q=${QUERY}` +
    `&unique=art&order=released`;
  const collected: TokenEntry[] = [];
  const seenNames = new Set<string>();

  let url: string | undefined = base;
  while (url && collected.length < TARGET) {
    const page: ScryfallPage = await fetchPage(url);
    for (const c of page.data) {
      if (collected.length >= TARGET) break;
      const art = c.image_uris?.art_crop;
      if (!art || !c.name) continue;
      if (seenNames.has(c.name)) continue;
      seenNames.add(c.name);
      collected.push({
        id: c.id,
        name: c.name,
        artist: c.artist ?? 'Unknown',
        artCropUrl: art,
      });
    }
    if (!page.has_more) break;
    url = page.next_page;
    await sleep(SLEEP_MS);
  }

  if (collected.length < TARGET) {
    console.warn(
      `WARN: only found ${collected.length}/${TARGET} tokens`,
    );
  }

  const json = JSON.stringify(collected, null, 2);
  const repoRoot = path.resolve(__dirname, '..');
  const assetPath = path.join(repoRoot, 'src', 'assets', 'tokens.json');
  const lambdaPath = path.join(repoRoot, 'infra', 'lambda', 'tokens.json');
  fs.writeFileSync(assetPath, json);
  fs.writeFileSync(lambdaPath, json);

  console.log(`Wrote ${collected.length} tokens to:`);
  console.log(`  ${assetPath}`);
  console.log(`  ${lambdaPath}`);
  console.log('Artists:');
  for (const t of collected) console.log(`  ${t.name} — ${t.artist}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 3: Add npm script to `package.json`**

Add to the `"scripts"` block in `package.json`:

```json
"fetch-tokens": "ts-node --project tools/tsconfig.json tools/fetch-tokens.ts"
```

If `ts-node` is not already a devDependency:

```bash
npm install --save-dev ts-node@10
```

- [ ] **Step 4: Run the script**

Run: `npm run fetch-tokens`
Expected: prints "Wrote 50 tokens to: …" plus an artist list. Two new JSON files exist.

If fewer than 50 are returned (filter too strict), loosen the query in `tools/fetch-tokens.ts` (e.g., drop `frame:2015` or `-is:reprint`) and re-run.

- [ ] **Step 5: Spot-check the output**

```bash
node -e "const t = require('./src/assets/tokens.json'); console.log(t.length, t[0]);"
```
Expected: `50 { id: '...', name: '...', artist: '...', artCropUrl: 'https://cards.scryfall.io/art_crop/...' }`

Also verify the two files are byte-identical:

```bash
diff src/assets/tokens.json infra/lambda/tokens.json
```
Expected: no output (files match).

- [ ] **Step 6: Commit**

```bash
git add tools/ package.json package-lock.json src/assets/tokens.json infra/lambda/tokens.json
git commit -m "feat(tokens): add fetch-tokens script and committed token pool"
```

---

## Task 2: Augment the shared protocol (frontend copy)

**Files:**
- Modify: `src/app/models/protocol.ts`

- [ ] **Step 1: Add `tokenId` to `PlayerSummary`**

Edit `src/app/models/protocol.ts`:

```ts
export interface PlayerSummary { playerId: string; name: string; tokenId: string | null; }
```

- [ ] **Step 2: Add `pick_token` to `ClientMessage` union**

In the same file, add to the union (preserve all existing variants):

```ts
  | { type: 'pick_token'; tokenId: string | null };
```

- [ ] **Step 3: Add `pick_rejected` to `ServerMessage` union**

```ts
  | { type: 'pick_rejected'; reason: 'taken' | 'unknown_token' | 'game_started' };
```

- [ ] **Step 4: Verify TS compiles**

Run: `npx tsc --noEmit -p .`
Expected: errors flagged in `game-state.service.ts` / `join.ts` consumers (we'll fix those in later tasks) — but the protocol file itself compiles. If errors come from inside `protocol.ts`, fix them now.

- [ ] **Step 5: Commit**

```bash
git add src/app/models/protocol.ts
git commit -m "feat(protocol): add tokenId, pick_token, pick_rejected (frontend)"
```

---

## Task 3: Augment the Lambda protocol copy

**Files:**
- Modify: `infra/lambda/protocol.ts`

- [ ] **Step 1: Apply the same three edits as Task 2 to `infra/lambda/protocol.ts`**

Resulting union members and interface:

```ts
export type ClientMessage =
  | { type: 'join'; name: string; playerId?: string }
  | { type: 'host_hello' }
  | { type: 'start_card'; weights: NameWeight[] }
  | { type: 'next_quote'; quote: string; possibleAnswers: string[] }
  | { type: 'guess'; quoteIndex: number; guess: string }
  | { type: 'reveal'; truth: string }
  | { type: 'end_game' }
  | { type: 'pick_token'; tokenId: string | null };

export type ServerMessage =
  // ... existing variants unchanged ...
  | { type: 'pick_rejected'; reason: 'taken' | 'unknown_token' | 'game_started' };

export interface PlayerSummary { playerId: string; name: string; tokenId: string | null; }
```

- [ ] **Step 2: Verify Lambda TS compiles (will reveal next tasks)**

Run: `cd infra && npx tsc --noEmit -p .`
Expected: errors in `handlers/join.ts` and `handlers/hostHello.ts` (they build `PlayerSummary` without `tokenId`) — fixed in Task 5. The protocol file itself compiles.

- [ ] **Step 3: Commit**

```bash
git add infra/lambda/protocol.ts
git commit -m "feat(protocol): add tokenId, pick_token, pick_rejected (lambda)"
```

---

## Task 4: Persist `tokenId` on the Lambda's player row

**Files:**
- Modify: `infra/lambda/state.ts`
- Test: `infra/lambda/__tests__/state.test.ts`

- [ ] **Step 1: Write a failing test for round-tripping `tokenId`**

Add to `infra/lambda/__tests__/state.test.ts` (preserving existing tests):

```ts
import { putPlayer, getPlayer, listPlayers } from '../state';

// existing tests preserved

describe('player tokenId persistence', () => {
  it('round-trips tokenId through putPlayer/getPlayer', async () => {
    const cardId = 'test-card-tokenid';
    await putPlayer(cardId, {
      playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: 'abc-123',
    });
    const got = await getPlayer(cardId, 'p1');
    expect(got?.tokenId).toBe('abc-123');
  });

  it('returns null tokenId when not set', async () => {
    const cardId = 'test-card-tokenid-null';
    await putPlayer(cardId, {
      playerId: 'p2', name: 'Bob', score: 0, card: null, tokenId: null,
    });
    const got = await getPlayer(cardId, 'p2');
    expect(got?.tokenId).toBeNull();
  });

  it('listPlayers includes tokenId', async () => {
    const cardId = 'test-card-tokenid-list';
    await putPlayer(cardId, {
      playerId: 'p3', name: 'Carol', score: 0, card: null, tokenId: 'xyz-789',
    });
    const list = await listPlayers(cardId);
    const found = list.find(p => p.playerId === 'p3');
    expect(found?.tokenId).toBe('xyz-789');
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `cd infra && npx jest __tests__/state.test.ts -t "tokenId"`
Expected: FAIL — TypeScript error that `tokenId` is not a property of `PlayerRow`.

- [ ] **Step 3: Update `PlayerRow` and its three I/O functions**

Edit `infra/lambda/state.ts`:

```ts
export interface PlayerRow {
  playerId: string;
  name: string;
  score: number;
  card: string[][] | null;
  tokenId: string | null;
}

export async function putPlayer(cardId: string, p: PlayerRow): Promise<void> {
  await ddb.send(new PutCommand({
    TableName: TABLE(),
    Item: {
      PK: cardScopedPK(cardId),
      SK: playerSK(p.playerId),
      playerId: p.playerId,
      name: p.name,
      score: p.score,
      card: p.card,
      tokenId: p.tokenId,
      ttl: ttl(),
    },
  }));
}

export async function getPlayer(cardId: string, playerId: string): Promise<PlayerRow | null> {
  const res = await ddb.send(new GetCommand({
    TableName: TABLE(),
    Key: { PK: cardScopedPK(cardId), SK: playerSK(playerId) },
  }));
  if (!res.Item) return null;
  return {
    playerId: res.Item.playerId ?? playerId,
    name: res.Item.name,
    score: res.Item.score ?? 0,
    card: res.Item.card ?? null,
    tokenId: res.Item.tokenId ?? null,
  };
}

export async function listPlayers(cardId: string): Promise<PlayerRow[]> {
  const res = await ddb.send(new QueryCommand({
    TableName: TABLE(),
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: { ':pk': cardScopedPK(cardId), ':sk': 'PLAYER#' },
  }));
  return (res.Items ?? []).map(i => ({
    playerId: i.playerId,
    name: i.name,
    score: i.score ?? 0,
    card: i.card ?? null,
    tokenId: i.tokenId ?? null,
  }));
}
```

The existing `deletePlayerCard` helper rebuilds a row via spread, which now carries `tokenId` automatically — no change needed there.

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `cd infra && npx jest __tests__/state.test.ts -t "tokenId"`
Expected: PASS (3 new tests).

Run the full state suite to confirm no regressions:

Run: `cd infra && npx jest __tests__/state.test.ts`
Expected: all green.

- [ ] **Step 5: Commit**

```bash
git add infra/lambda/state.ts infra/lambda/__tests__/state.test.ts
git commit -m "feat(state): persist tokenId on PlayerRow"
```

---

## Task 5: Include `tokenId` in Lambda `PlayerSummary` broadcasts

**Files:**
- Modify: `infra/lambda/handlers/join.ts`
- Modify: `infra/lambda/handlers/hostHello.ts`
- Test: `infra/lambda/__tests__/join.test.ts`
- Test: `infra/lambda/__tests__/hostHello.test.ts`

- [ ] **Step 1: Read the existing `hostHello.ts` to find its summary build site**

Run: `cat infra/lambda/handlers/hostHello.ts`

Note where it constructs `PlayerSummary[]`. The change is mechanical: include `tokenId: p.tokenId` in the map.

- [ ] **Step 2: Write failing tests asserting `tokenId` flows through broadcasts**

In `infra/lambda/__tests__/join.test.ts`, add (preserving existing tests):

```ts
it('includes tokenId (null for new joiner) in lobby_update and joined', async () => {
  // Existing test setup pattern — capture broadcast & sendTo calls
  // Then assert:
  // - the joined.players entries each have tokenId === null
  // - the lobby_update broadcast players each have tokenId === null
});
```

Translate that template to the project's existing test style (see other tests in the same file for the mocking pattern around `broadcastToAll` / `sendTo`). Look for an existing test like "broadcasts lobby_update on join" and add an `expect(...).toEqual(expect.objectContaining({ tokenId: null }))` style assertion on the players array.

Add an analogous test to `infra/lambda/__tests__/hostHello.test.ts` asserting the `host_state` reply's `players` array carries `tokenId`.

- [ ] **Step 3: Run tests and confirm they fail**

Run: `cd infra && npx jest __tests__/join.test.ts __tests__/hostHello.test.ts`
Expected: the new assertions fail because the produced summaries lack `tokenId`.

- [ ] **Step 4: Update `handlers/join.ts` summary construction**

Change the `summaries` line in `infra/lambda/handlers/join.ts:37`:

```ts
const summaries: PlayerSummary[] = players.map(p => ({
  playerId: p.playerId, name: p.name, tokenId: p.tokenId,
}));
```

Also: a newly-created player (the `if (!player)` branch around line 17) must be created with `tokenId: null`. Change:

```ts
player = { playerId, name: msg.name, score: 0, card, tokenId: null };
```

And in the rename branch (`else if (player.name !== msg.name)`), the spread already preserves `tokenId`.

- [ ] **Step 5: Update `handlers/hostHello.ts` summary construction**

Apply the same `map` change wherever `hostHello.ts` builds `PlayerSummary[]` — include `tokenId: p.tokenId`.

- [ ] **Step 6: Run the two test files and confirm pass**

Run: `cd infra && npx jest __tests__/join.test.ts __tests__/hostHello.test.ts`
Expected: PASS.

- [ ] **Step 7: Run the full Lambda suite for regressions**

Run: `cd infra && npx jest`
Expected: all green. If a snapshot or equality assertion in an unrelated handler breaks because `players` arrays now carry an extra `tokenId: null` field, update the expected value to include `tokenId: null` — do NOT strip the field from the production code.

- [ ] **Step 8: Commit**

```bash
git add infra/lambda/handlers/join.ts infra/lambda/handlers/hostHello.ts infra/lambda/__tests__/
git commit -m "feat(lambda): include tokenId in PlayerSummary broadcasts"
```

---

## Task 6: New `pick_token` handler (token pool load + validation + broadcast)

**Files:**
- Create: `infra/lambda/handlers/pickToken.ts`
- Create: `infra/lambda/__tests__/pickToken.test.ts`
- Modify: `infra/lambda/handler.ts`

- [ ] **Step 1: Write the failing test suite for `handlePickToken`**

Create `infra/lambda/__tests__/pickToken.test.ts`. Use the mocking patterns from existing handler tests (e.g., `__tests__/guess.test.ts`) to mock `getCardSession`, `getConnection`, `listPlayers`, `putPlayer`, `sendTo`, and `broadcastToAll`.

```ts
import { handlePickToken } from '../handlers/pickToken';
import * as state from '../state';
import * as connections from '../connections';
import * as broadcast from '../broadcast';

jest.mock('../state');
jest.mock('../connections');
jest.mock('../broadcast');

// Test token id that should exist in tokens.json
const VALID_TOKEN = 'TEST_TOKEN_VALID';
// And one that should not
const UNKNOWN_TOKEN = 'TEST_TOKEN_UNKNOWN';

// We override the pool the handler uses via a module hook (see Step 3).
beforeAll(() => {
  (handlePickToken as any).__setValidTokenIds(new Set([VALID_TOKEN]));
});

describe('handlePickToken', () => {
  const cardId = 'card-1';
  const session = { cardId, phase: 'lobby' as const, currentQuoteIndex: 0 };
  const endpoint = 'https://example/prod';

  beforeEach(() => {
    jest.resetAllMocks();
    (state.getCardSession as jest.Mock).mockResolvedValue(session);
    (connections.getConnection as jest.Mock).mockResolvedValue({
      connectionId: 'c1', playerId: 'p1', cardId, role: 'player',
    });
    (state.listPlayers as jest.Mock).mockResolvedValue([
      { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: null },
      { playerId: 'p2', name: 'Bob',   score: 0, card: null, tokenId: null },
    ]);
    (state.getPlayer as jest.Mock).mockImplementation(async (_cid, pid) => {
      const all = await (state.listPlayers as jest.Mock).getMockImplementation()!(_cid);
      return all.find((p: any) => p.playerId === pid) ?? null;
    });
  });

  it('claims an unused valid token, persists, and broadcasts lobby_update', async () => {
    await handlePickToken({ type: 'pick_token', tokenId: VALID_TOKEN }, 'c1', endpoint);
    expect(state.putPlayer).toHaveBeenCalledWith(cardId, expect.objectContaining({
      playerId: 'p1', tokenId: VALID_TOKEN,
    }));
    expect(broadcast.broadcastToAll).toHaveBeenCalledWith(endpoint, expect.objectContaining({
      type: 'lobby_update',
    }));
  });

  it('rejects with "unknown_token" when tokenId not in pool', async () => {
    await handlePickToken({ type: 'pick_token', tokenId: UNKNOWN_TOKEN }, 'c1', endpoint);
    expect(broadcast.sendTo).toHaveBeenCalledWith(endpoint, 'c1', {
      type: 'pick_rejected', reason: 'unknown_token',
    });
    expect(state.putPlayer).not.toHaveBeenCalled();
  });

  it('rejects with "taken" when another player holds the token', async () => {
    (state.listPlayers as jest.Mock).mockResolvedValue([
      { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: null },
      { playerId: 'p2', name: 'Bob',   score: 0, card: null, tokenId: VALID_TOKEN },
    ]);
    await handlePickToken({ type: 'pick_token', tokenId: VALID_TOKEN }, 'c1', endpoint);
    expect(broadcast.sendTo).toHaveBeenCalledWith(endpoint, 'c1', {
      type: 'pick_rejected', reason: 'taken',
    });
    expect(state.putPlayer).not.toHaveBeenCalled();
  });

  it('rejects with "game_started" when phase is live', async () => {
    (state.getCardSession as jest.Mock).mockResolvedValue({ ...session, phase: 'live' });
    await handlePickToken({ type: 'pick_token', tokenId: VALID_TOKEN }, 'c1', endpoint);
    expect(broadcast.sendTo).toHaveBeenCalledWith(endpoint, 'c1', {
      type: 'pick_rejected', reason: 'game_started',
    });
    expect(state.putPlayer).not.toHaveBeenCalled();
  });

  it('releases the player\'s token when tokenId is null', async () => {
    (state.listPlayers as jest.Mock).mockResolvedValue([
      { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: VALID_TOKEN },
    ]);
    await handlePickToken({ type: 'pick_token', tokenId: null }, 'c1', endpoint);
    expect(state.putPlayer).toHaveBeenCalledWith(cardId, expect.objectContaining({
      playerId: 'p1', tokenId: null,
    }));
    expect(broadcast.broadcastToAll).toHaveBeenCalled();
  });

  it('allows re-picking the same player\'s currently held token (overwrite, no "taken")', async () => {
    const OTHER = 'TEST_TOKEN_OTHER';
    (handlePickToken as any).__setValidTokenIds(new Set([VALID_TOKEN, OTHER]));
    (state.listPlayers as jest.Mock).mockResolvedValue([
      { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: VALID_TOKEN },
    ]);
    await handlePickToken({ type: 'pick_token', tokenId: OTHER }, 'c1', endpoint);
    expect(state.putPlayer).toHaveBeenCalledWith(cardId, expect.objectContaining({
      playerId: 'p1', tokenId: OTHER,
    }));
    expect(broadcast.sendTo).not.toHaveBeenCalledWith(endpoint, 'c1', expect.objectContaining({
      type: 'pick_rejected',
    }));
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

Run: `cd infra && npx jest __tests__/pickToken.test.ts`
Expected: FAIL — `handlePickToken` does not exist yet.

- [ ] **Step 3: Implement `handlers/pickToken.ts`**

Create `infra/lambda/handlers/pickToken.ts`:

```ts
import { ClientMessage, PlayerSummary } from '../protocol';
import { getCardSession, getPlayer, putPlayer, listPlayers } from '../state';
import { getConnection } from '../connections';
import { sendTo, broadcastToAll } from '../broadcast';
import tokensJson from '../tokens.json';

let validTokenIds: Set<string> = new Set(
  (tokensJson as Array<{ id: string }>).map(t => t.id),
);

// Test hook — production code does not call this.
(handlePickToken as any).__setValidTokenIds = (ids: Set<string>): void => {
  validTokenIds = ids;
};

export async function handlePickToken(
  msg: Extract<ClientMessage, { type: 'pick_token' }>,
  connectionId: string,
  endpoint: string,
): Promise<void> {
  const session = await getCardSession();
  if (!session) return;

  if (session.phase !== 'lobby') {
    await sendTo(endpoint, connectionId, { type: 'pick_rejected', reason: 'game_started' });
    return;
  }

  if (msg.tokenId !== null && !validTokenIds.has(msg.tokenId)) {
    await sendTo(endpoint, connectionId, { type: 'pick_rejected', reason: 'unknown_token' });
    return;
  }

  const conn = await getConnection(connectionId);
  if (!conn?.playerId) return;
  const me = await getPlayer(session.cardId, conn.playerId);
  if (!me) return;

  if (msg.tokenId !== null) {
    const players = await listPlayers(session.cardId);
    const heldBySomeoneElse = players.some(
      p => p.tokenId === msg.tokenId && p.playerId !== me.playerId,
    );
    if (heldBySomeoneElse) {
      await sendTo(endpoint, connectionId, { type: 'pick_rejected', reason: 'taken' });
      return;
    }
  }

  await putPlayer(session.cardId, { ...me, tokenId: msg.tokenId });

  const players = await listPlayers(session.cardId);
  const summaries: PlayerSummary[] = players.map(p => ({
    playerId: p.playerId, name: p.name, tokenId: p.tokenId,
  }));
  await broadcastToAll(endpoint, { type: 'lobby_update', players: summaries });
}
```

- [ ] **Step 4: Register the handler in `handler.ts`**

Edit `infra/lambda/handler.ts`. Add the import:

```ts
import { handlePickToken } from './handlers/pickToken';
```

Add the case to the `dispatch` switch (right after `case 'end_game':`):

```ts
case 'pick_token': return handlePickToken(msg, connId, endpoint);
```

- [ ] **Step 5: Run handler tests and confirm pass**

Run: `cd infra && npx jest __tests__/pickToken.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 6: Run the full Lambda suite**

Run: `cd infra && npx jest`
Expected: all green.

- [ ] **Step 7: Commit**

```bash
git add infra/lambda/handlers/pickToken.ts infra/lambda/handler.ts infra/lambda/__tests__/pickToken.test.ts
git commit -m "feat(lambda): handle pick_token with pool validation and per-lobby uniqueness"
```

---

## Task 7: Auto-assign random unused tokens on `start_card`

**Files:**
- Modify: `infra/lambda/handlers/startCard.ts`
- Test: `infra/lambda/__tests__/startCard.test.ts`

- [ ] **Step 1: Write the failing test**

Add to `infra/lambda/__tests__/startCard.test.ts`:

```ts
it('assigns random unused tokens to players with null tokenId before broadcasting', async () => {
  // Set up: 3 players, 2 with tokens, 1 with null
  // Mock validTokenIds pool of size 5
  // Run handleStartCard
  // Assert: putPlayer is called for the null-token player with a tokenId that is
  //   (a) in the pool and (b) not equal to either of the other two players' tokens.
});
```

Translate to the actual mocking style used by the existing tests in this file (look at the existing `handleStartCard` tests for the patterns).

- [ ] **Step 2: Run to confirm fail**

Run: `cd infra && npx jest __tests__/startCard.test.ts -t "assigns random unused tokens"`
Expected: FAIL.

- [ ] **Step 3: Implement the auto-assignment**

Edit `infra/lambda/handlers/startCard.ts`. After loading `players` and before the `for (const p of players)` loop that regenerates cards, compute random unused token assignments:

```ts
import tokensJson from '../tokens.json';

const ALL_TOKEN_IDS: string[] = (tokensJson as Array<{ id: string }>).map(t => t.id);

// Test hook
(handleStartCard as any).__setAllTokenIds = (ids: string[]): void => {
  (ALL_TOKEN_IDS as unknown as string[]).length = 0;
  ALL_TOKEN_IDS.push(...ids);
};
```

Then, in the function body just after `const players = await listPlayers(session.cardId);`:

```ts
const taken = new Set(players.map(p => p.tokenId).filter((t): t is string => !!t));
const available = ALL_TOKEN_IDS.filter(id => !taken.has(id));
const shuffled = [...available];
for (let i = shuffled.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}
let nextFree = 0;
for (const p of players) {
  if (p.tokenId === null && nextFree < shuffled.length) {
    p.tokenId = shuffled[nextFree++];
  }
}
```

The existing `for (const p of players)` loop that calls `putPlayer(...{ ...p, score: 0, card })` already spreads `p`, so the freshly-set `p.tokenId` will be persisted alongside the new card. No further change needed in that loop.

- [ ] **Step 4: Run the test, confirm pass**

Run: `cd infra && npx jest __tests__/startCard.test.ts`
Expected: PASS.

- [ ] **Step 5: Run the full Lambda suite**

Run: `cd infra && npx jest`
Expected: all green.

- [ ] **Step 6: Commit**

```bash
git add infra/lambda/handlers/startCard.ts infra/lambda/__tests__/startCard.test.ts
git commit -m "feat(lambda): auto-assign random unused tokens at start_card"
```

---

## Task 8: Deploy the Lambda (manual)

**Files:** none.

- [ ] **Step 1: Run the deploy**

Run: `cd infra && npm run deploy`
Expected: CDK reports `SussyBingoStack` updated successfully and prints the `WebSocketUrl` (unchanged from before).

- [ ] **Step 2: Verify the new handler is wired**

Tail Lambda logs in a second terminal:

```bash
aws logs tail /aws/lambda/<SussyBingoStack-WebSocketHandler-…> --follow
```

(Find the exact log group name in the CloudWatch console or via `aws lambda list-functions`.) Leave it open for the next manual smoke test in Task 14.

There is no commit for this task — it's a deploy.

---

## Task 9: Frontend `TokensService`

**Files:**
- Create: `src/app/services/tokens.service.ts`
- Create: `src/app/services/tokens.service.spec.ts`

- [ ] **Step 1: Write the failing test**

Create `src/app/services/tokens.service.spec.ts`:

```ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokensService, Token } from './tokens.service';

describe('TokensService', () => {
  let svc: TokensService;
  let http: HttpTestingController;

  const fixture: Token[] = [
    { id: 'a', name: 'Goblin', artist: 'X', artCropUrl: 'https://example/a.jpg' },
    { id: 'b', name: 'Squirrel', artist: 'Y', artCropUrl: 'https://example/b.jpg' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    svc = TestBed.inject(TokensService);
    http = TestBed.inject(HttpTestingController);
  });

  it('loads tokens.json and exposes the pool', async () => {
    const promise = svc.load();
    http.expectOne('assets/tokens.json').flush(fixture);
    await promise;
    expect(svc.tokens.length).toBe(2);
    expect(svc.byId('a')?.name).toBe('Goblin');
  });

  it('byId returns undefined for unknown id', async () => {
    const promise = svc.load();
    http.expectOne('assets/tokens.json').flush(fixture);
    await promise;
    expect(svc.byId('nope')).toBeUndefined();
    expect(svc.byId(null)).toBeUndefined();
  });

  it('exposes an empty pool if the fetch fails', async () => {
    const promise = svc.load();
    http.expectOne('assets/tokens.json').error(new ErrorEvent('network'));
    await promise;
    expect(svc.tokens).toEqual([]);
  });
});
```

- [ ] **Step 2: Run to confirm fail**

Run: `npx ng test --watch=false --include='**/tokens.service.spec.ts'`
Expected: FAIL — `TokensService` does not exist.

- [ ] **Step 3: Implement the service**

Create `src/app/services/tokens.service.ts`:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Token {
  id: string;
  name: string;
  artist: string;
  artCropUrl: string;
}

@Injectable({ providedIn: 'root' })
export class TokensService {
  tokens: Token[] = [];
  private byIdMap = new Map<string, Token>();

  constructor(private http: HttpClient) {}

  async load(): Promise<void> {
    try {
      const list = await firstValueFrom(this.http.get<Token[]>('assets/tokens.json'));
      this.tokens = list ?? [];
    } catch {
      this.tokens = [];
    }
    this.byIdMap.clear();
    for (const t of this.tokens) this.byIdMap.set(t.id, t);
  }

  byId(tokenId: string | null | undefined): Token | undefined {
    if (!tokenId) return undefined;
    return this.byIdMap.get(tokenId);
  }
}
```

- [ ] **Step 4: Trigger `load()` once at app startup**

Edit `src/app/app.module.ts`. Use Angular's `APP_INITIALIZER`:

```ts
import { APP_INITIALIZER } from '@angular/core';
import { TokensService } from './services/tokens.service';

// In the @NgModule providers array, add:
{
  provide: APP_INITIALIZER,
  multi: true,
  deps: [TokensService],
  useFactory: (svc: TokensService) => () => svc.load(),
},
```

Verify `HttpClientModule` is already imported in `app.module.ts`. If not (search for it), add the import and put `HttpClientModule` in the `imports` array.

- [ ] **Step 5: Run tests, confirm pass**

Run: `npx ng test --watch=false --include='**/tokens.service.spec.ts'`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add src/app/services/tokens.service.ts src/app/services/tokens.service.spec.ts src/app/app.module.ts
git commit -m "feat(frontend): TokensService loads tokens.json at app startup"
```

---

## Task 10: `TokenAvatarComponent` (presentational)

**Files:**
- Create: `src/app/components/token-avatar/token-avatar.component.ts`
- Create: `src/app/components/token-avatar/token-avatar.component.html`
- Create: `src/app/components/token-avatar/token-avatar.component.scss`
- Create: `src/app/components/token-avatar/token-avatar.component.spec.ts`
- Modify: `src/app/app.module.ts`

- [ ] **Step 1: Write the failing test**

Create `src/app/components/token-avatar/token-avatar.component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenAvatarComponent } from './token-avatar.component';
import { TokensService } from '../../services/tokens.service';

class FakeTokensService {
  byId(id: string | null) {
    if (id === 'a') return { id: 'a', name: 'Goblin', artist: 'X', artCropUrl: 'http://example/a.jpg' };
    return undefined;
  }
}

describe('TokenAvatarComponent', () => {
  let fixture: ComponentFixture<TokenAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokenAvatarComponent],
      providers: [{ provide: TokensService, useClass: FakeTokensService }],
    }).compileComponents();
    fixture = TestBed.createComponent(TokenAvatarComponent);
  });

  it('renders the token art img when tokenId resolves', () => {
    fixture.componentInstance.tokenId = 'a';
    fixture.detectChanges();
    const img: HTMLImageElement | null = fixture.nativeElement.querySelector('img.avatar-img');
    expect(img).not.toBeNull();
    expect(img!.src).toContain('http://example/a.jpg');
    expect(img!.alt).toBe('Goblin');
  });

  it('renders the silhouette placeholder when tokenId is null', () => {
    fixture.componentInstance.tokenId = null;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img.avatar-img')).toBeNull();
    expect(fixture.nativeElement.querySelector('.avatar-placeholder')).not.toBeNull();
  });

  it('renders the placeholder when tokenId is unknown', () => {
    fixture.componentInstance.tokenId = 'unknown';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img.avatar-img')).toBeNull();
    expect(fixture.nativeElement.querySelector('.avatar-placeholder')).not.toBeNull();
  });

  it('applies the size class', () => {
    fixture.componentInstance.tokenId = 'a';
    fixture.componentInstance.size = 'sm';
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement.querySelector('.avatar');
    expect(root.classList).toContain('size-sm');
  });
});
```

- [ ] **Step 2: Run to confirm fail**

Run: `npx ng test --watch=false --include='**/token-avatar.component.spec.ts'`
Expected: FAIL — component not declared.

- [ ] **Step 3: Implement the component**

`src/app/components/token-avatar/token-avatar.component.ts`:

```ts
import { Component, Input } from '@angular/core';
import { TokensService, Token } from '../../services/tokens.service';

@Component({
  selector: 'app-token-avatar',
  templateUrl: './token-avatar.component.html',
  styleUrls: ['./token-avatar.component.scss'],
})
export class TokenAvatarComponent {
  @Input() tokenId: string | null = null;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  constructor(private tokens: TokensService) {}

  get token(): Token | undefined {
    return this.tokens.byId(this.tokenId);
  }
}
```

`src/app/components/token-avatar/token-avatar.component.html`:

```html
<div class="avatar" [class.size-sm]="size === 'sm'" [class.size-md]="size === 'md'" [class.size-lg]="size === 'lg'">
  <img *ngIf="token; else placeholder" class="avatar-img" [src]="token.artCropUrl" [alt]="token.name" />
  <ng-template #placeholder>
    <div class="avatar-placeholder" aria-label="No avatar selected">?</div>
  </ng-template>
</div>
```

`src/app/components/token-avatar/token-avatar.component.scss`:

```scss
.avatar {
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  flex-shrink: 0;

  &.size-sm { width: 32px; height: 32px; }
  &.size-md { width: 48px; height: 48px; }
  &.size-lg { width: 96px; height: 96px; }
}
.avatar-img {
  width: 100%; height: 100%; object-fit: cover; display: block;
}
.avatar-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
}
```

- [ ] **Step 4: Declare the component in `app.module.ts`**

Add the import and the declaration:

```ts
import { TokenAvatarComponent } from './components/token-avatar/token-avatar.component';
// ...
declarations: [
  // existing entries,
  TokenAvatarComponent,
],
```

- [ ] **Step 5: Run tests, confirm pass**

Run: `npx ng test --watch=false --include='**/token-avatar.component.spec.ts'`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add src/app/components/token-avatar/ src/app/app.module.ts
git commit -m "feat(frontend): TokenAvatarComponent"
```

---

## Task 11: `TokenPickerComponent`

**Files:**
- Create: `src/app/components/token-picker/token-picker.component.ts`
- Create: `src/app/components/token-picker/token-picker.component.html`
- Create: `src/app/components/token-picker/token-picker.component.scss`
- Create: `src/app/components/token-picker/token-picker.component.spec.ts`
- Modify: `src/app/app.module.ts`

- [ ] **Step 1: Write the failing test**

Create `src/app/components/token-picker/token-picker.component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenPickerComponent } from './token-picker.component';
import { TokenAvatarComponent } from '../token-avatar/token-avatar.component';
import { TokensService, Token } from '../../services/tokens.service';

class FakeTokensService {
  tokens: Token[] = [
    { id: 'a', name: 'Goblin',   artist: 'X', artCropUrl: 'http://e/a.jpg' },
    { id: 'b', name: 'Squirrel', artist: 'Y', artCropUrl: 'http://e/b.jpg' },
    { id: 'c', name: 'Spirit',   artist: 'Z', artCropUrl: 'http://e/c.jpg' },
  ];
  byId(id: string | null) { return id ? this.tokens.find(t => t.id === id) : undefined; }
}

describe('TokenPickerComponent', () => {
  let fixture: ComponentFixture<TokenPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokenPickerComponent, TokenAvatarComponent],
      providers: [{ provide: TokensService, useClass: FakeTokensService }],
    }).compileComponents();
    fixture = TestBed.createComponent(TokenPickerComponent);
    fixture.componentInstance.myPlayerId = 'p1';
    fixture.componentInstance.players = [
      { playerId: 'p1', name: 'Alice', tokenId: null },
      { playerId: 'p2', name: 'Bob',   tokenId: 'b' },
    ];
    fixture.detectChanges();
  });

  it('renders one tile per token in the service pool', () => {
    const tiles = fixture.nativeElement.querySelectorAll('.token-tile');
    expect(tiles.length).toBe(3);
  });

  it('marks tokens held by other players as taken (not clickable)', () => {
    const tileB: HTMLElement = fixture.nativeElement.querySelector('[data-token-id="b"]');
    expect(tileB.classList).toContain('taken');
    expect(tileB.classList).not.toContain('mine');
  });

  it('marks the player\'s own token with "mine"', () => {
    fixture.componentInstance.players = [
      { playerId: 'p1', name: 'Alice', tokenId: 'a' },
      { playerId: 'p2', name: 'Bob',   tokenId: 'b' },
    ];
    fixture.detectChanges();
    const tileA: HTMLElement = fixture.nativeElement.querySelector('[data-token-id="a"]');
    expect(tileA.classList).toContain('mine');
  });

  it('emits pick(id) when an available tile is clicked', () => {
    const spy = jasmine.createSpy('pick');
    fixture.componentInstance.pick.subscribe(spy);
    const tileA: HTMLElement = fixture.nativeElement.querySelector('[data-token-id="a"]');
    tileA.click();
    expect(spy).toHaveBeenCalledWith('a');
  });

  it('emits pick(null) when clicking your own currently-picked tile', () => {
    fixture.componentInstance.players = [
      { playerId: 'p1', name: 'Alice', tokenId: 'a' },
    ];
    fixture.detectChanges();
    const spy = jasmine.createSpy('pick');
    fixture.componentInstance.pick.subscribe(spy);
    const tileA: HTMLElement = fixture.nativeElement.querySelector('[data-token-id="a"]');
    tileA.click();
    expect(spy).toHaveBeenCalledWith(null);
  });

  it('does NOT emit pick when clicking a token held by someone else', () => {
    const spy = jasmine.createSpy('pick');
    fixture.componentInstance.pick.subscribe(spy);
    const tileB: HTMLElement = fixture.nativeElement.querySelector('[data-token-id="b"]');
    tileB.click();
    expect(spy).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run to confirm fail**

Run: `npx ng test --watch=false --include='**/token-picker.component.spec.ts'`
Expected: FAIL.

- [ ] **Step 3: Implement the component**

`src/app/components/token-picker/token-picker.component.ts`:

```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerSummary } from '../../models/protocol';
import { TokensService, Token } from '../../services/tokens.service';

@Component({
  selector: 'app-token-picker',
  templateUrl: './token-picker.component.html',
  styleUrls: ['./token-picker.component.scss'],
})
export class TokenPickerComponent {
  @Input() myPlayerId = '';
  @Input() players: PlayerSummary[] = [];
  @Output() pick = new EventEmitter<string | null>();

  constructor(public tokensSvc: TokensService) {}

  ownerOf(tokenId: string): PlayerSummary | undefined {
    return this.players.find(p => p.tokenId === tokenId);
  }

  isMine(tokenId: string): boolean {
    return this.ownerOf(tokenId)?.playerId === this.myPlayerId;
  }

  isTakenByOther(tokenId: string): boolean {
    const owner = this.ownerOf(tokenId);
    return !!owner && owner.playerId !== this.myPlayerId;
  }

  onTileClick(token: Token): void {
    if (this.isTakenByOther(token.id)) return;
    if (this.isMine(token.id)) this.pick.emit(null);
    else this.pick.emit(token.id);
  }
}
```

`src/app/components/token-picker/token-picker.component.html`:

```html
<div class="token-picker">
  <h3 class="picker-title">Pick your avatar</h3>
  <div class="token-grid">
    <button
      *ngFor="let t of tokensSvc.tokens"
      type="button"
      class="token-tile"
      [class.taken]="isTakenByOther(t.id)"
      [class.mine]="isMine(t.id)"
      [attr.data-token-id]="t.id"
      [attr.aria-label]="t.name + ' by ' + t.artist"
      (click)="onTileClick(t)">
      <app-token-avatar [tokenId]="t.id" size="lg"></app-token-avatar>
      <div class="token-name">{{ t.name }}</div>
      <div class="token-artist">{{ t.artist }}</div>
      <div class="taken-by" *ngIf="isTakenByOther(t.id)">
        {{ ownerOf(t.id)?.name }}
      </div>
    </button>
  </div>
</div>
```

`src/app/components/token-picker/token-picker.component.scss`:

```scss
.token-picker { width: 100%; }
.picker-title { margin: 0 0 12px; font-size: 1.1rem; }

.token-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  gap: 12px;
}

.token-tile {
  background: rgba(255, 255, 255, 0.04);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 8px;
  text-align: center;
  color: inherit;
  font: inherit;
  position: relative;

  &.taken {
    opacity: 0.35;
    filter: grayscale(0.6);
    pointer-events: none;
  }
  &.mine {
    border-color: #ffd166;
    background: rgba(255, 209, 102, 0.12);
  }
}

.token-name   { margin-top: 6px; font-size: 0.85rem; font-weight: 600; }
.token-artist { font-size: 0.7rem; opacity: 0.7; }
.taken-by {
  position: absolute; bottom: 4px; left: 0; right: 0;
  font-size: 0.7rem; opacity: 0.9;
}
```

- [ ] **Step 4: Declare in `app.module.ts`**

```ts
import { TokenPickerComponent } from './components/token-picker/token-picker.component';
// ...
declarations: [/* existing */, TokenPickerComponent],
```

- [ ] **Step 5: Run tests, confirm pass**

Run: `npx ng test --watch=false --include='**/token-picker.component.spec.ts'`
Expected: PASS (6 tests).

- [ ] **Step 6: Commit**

```bash
git add src/app/components/token-picker/ src/app/app.module.ts
git commit -m "feat(frontend): TokenPickerComponent"
```

---

## Task 12: Handle `pick_rejected` in `GameStateService`

**Files:**
- Modify: `src/app/services/game-state.service.ts`

- [ ] **Step 1: Add a `pick_rejected` case to the `apply` switch**

In `src/app/services/game-state.service.ts`, add a case alongside the existing `'error'` handler:

```ts
case 'pick_rejected':
  console.warn('pick rejected:', msg.reason);
  return;
```

The picker UI revert happens implicitly: the server's authoritative `lobby_update` already reflects the unchanged state, so the client just keeps showing the existing roster.

- [ ] **Step 2: Verify TS compiles**

Run: `npx tsc --noEmit -p .`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/services/game-state.service.ts
git commit -m "feat(frontend): handle pick_rejected in GameStateService"
```

---

## Task 13: Wire the picker into `PlayerComponent` lobby view

**Files:**
- Modify: `src/app/pages/player/player.component.ts`
- Modify: `src/app/pages/player/player.component.html`

- [ ] **Step 1: Add a pick handler method to `PlayerComponent`**

In `src/app/pages/player/player.component.ts`, add a public method:

```ts
onPickToken(tokenId: string | null): void {
  this.ws.send({ type: 'pick_token', tokenId });
}
```

- [ ] **Step 2: Render the picker in the lobby block**

Edit `src/app/pages/player/player.component.html`. Inside the lobby `<ng-container>` (currently lines 31–42), update the players list to show each player's avatar next to their name, and add the picker below the list:

```html
<ng-container *ngIf="!needsName && state.phase === 'lobby'">
  <div class="lobby sb-card">
    <h2 class="lobby-title">Hang tight…</h2>
    <p class="lobby-sub">You're in as <strong>{{ state.me?.name }}</strong></p>
    <div class="lobby-divider">Players in the room</div>
    <ul class="lobby-players">
      <li *ngFor="let p of state.players" [class.you]="p.playerId === state.me?.playerId">
        <app-token-avatar [tokenId]="p.tokenId" size="sm"></app-token-avatar>
        <span class="lobby-player-name">{{ p.name }}</span>
      </li>
    </ul>
    <app-token-picker
      *ngIf="state.me"
      [myPlayerId]="state.me.playerId"
      [players]="state.players"
      (pick)="onPickToken($event)">
    </app-token-picker>
  </div>
</ng-container>
```

- [ ] **Step 3: Add minimal SCSS for the new layout**

In `src/app/pages/player/player.component.scss`, add:

```scss
.lobby-players li {
  display: flex;
  align-items: center;
  gap: 10px;
}
.lobby-player-name { flex: 1; }
```

- [ ] **Step 4: Build the app and check for compile errors**

Run: `npm run build`
Expected: build completes without errors.

- [ ] **Step 5: Manual smoke (deferred to Task 15) — for now just confirm dev server boots**

Run: `npm start` (let it boot, then Ctrl-C)
Expected: compiles, no template binding errors in the terminal.

- [ ] **Step 6: Commit**

```bash
git add src/app/pages/player/
git commit -m "feat(frontend): embed token picker in player lobby view"
```

---

## Task 14: Wire avatars into `HostComponent` (lobby tiles, leaderboard, reveal)

**Files:**
- Modify: `src/app/pages/host/host.component.html`
- Modify: `src/app/pages/host/host.component.scss`

- [ ] **Step 1: Update the lobby player tiles**

Replace the `<li>` in the lobby block of `src/app/pages/host/host.component.html` (currently line 28):

```html
<li *ngFor="let p of state.players" class="player-tile">
  <app-token-avatar [tokenId]="p.tokenId" size="md"></app-token-avatar>
  <span class="player-tile-name">{{ p.name }}</span>
</li>
```

- [ ] **Step 2: Update the leaderboard row**

In the `<aside class="leaderboard">` block (around lines 65–75), update the row template:

```html
<li *ngFor="let row of state.leaderboard; let i = index" class="leaderboard-row" [class.first]="i === 0">
  <span class="rank">{{ i + 1 }}</span>
  <app-token-avatar [tokenId]="tokenIdFor(row.playerId)" size="sm"></app-token-avatar>
  <span class="name">{{ row.name }}</span>
  <span class="score">{{ row.score }}</span>
</li>
```

Leaderboard entries don't carry `tokenId` directly (see [src/app/models/protocol.ts:36](../../src/app/models/protocol.ts#L36): `LeaderboardEntry` is `{ playerId, name, score }`), so we look it up against `state.players`. Add this helper to `src/app/pages/host/host.component.ts`:

```ts
tokenIdFor(playerId: string): string | null {
  return this.state.players.find(p => p.playerId === playerId)?.tokenId ?? null;
}
```

- [ ] **Step 3: Add an avatar row to the reveal banner on the host stage**

The host's reveal block currently shows just `state.lastReveal.truth`. Add a per-player rundown showing each player's avatar, their guess, and a check/x. Replace the existing truth-banner block (around lines 45–47) with:

```html
<div *ngIf="state.lastReveal && state.lastReveal.index === state.currentQuote.index" class="truth-banner">
  <div class="truth-line">The truth: <strong>{{ state.lastReveal.truth }}</strong></div>
  <ul class="reveal-rows">
    <li *ngFor="let row of state.lastReveal.perPlayer" class="reveal-row" [class.correct]="row.correct">
      <app-token-avatar [tokenId]="tokenIdFor(row.playerId)" size="sm"></app-token-avatar>
      <span class="reveal-name">{{ row.name }}</span>
      <span class="reveal-guess">{{ row.guess ?? '—' }}</span>
      <span class="reveal-mark">{{ row.correct ? '✅' : '❌' }}</span>
    </li>
  </ul>
</div>
```

- [ ] **Step 4: Add SCSS for the new rows**

Append to `src/app/pages/host/host.component.scss`:

```scss
.player-tile {
  display: flex;
  align-items: center;
  gap: 10px;
}
.player-tile-name { font-weight: 600; }

.leaderboard-row {
  display: flex;
  align-items: center;
  gap: 8px;
  .rank  { width: 1.5em; text-align: right; }
  .name  { flex: 1; }
  .score { font-variant-numeric: tabular-nums; }
}

.reveal-rows {
  list-style: none; padding: 0; margin: 12px 0 0;
  display: flex; flex-direction: column; gap: 6px;
}
.reveal-row {
  display: flex; align-items: center; gap: 8px;
  .reveal-name  { flex: 1; }
  .reveal-guess { opacity: 0.85; }
  &.correct .reveal-name { color: #74e08c; }
}
```

- [ ] **Step 5: Build and confirm the template compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/app/pages/host/
git commit -m "feat(frontend): avatars in host lobby tiles, leaderboard, and reveal"
```

---

## Task 15: Manual end-to-end smoke

**Files:** none.

- [ ] **Step 1: Start the dev server**

Run: `npm start`
Wait for "✔ Compiled successfully" at http://localhost:4200/.

- [ ] **Step 2: Open the host view**

Browser tab 1 → http://localhost:4200/host
Expected: connects (the live deployed `wsUrl` is used), shows the lobby with "Waiting for players".

- [ ] **Step 3: Open two player tabs**

Tab 2 → http://localhost:4200/play , enter "Alice", Join.
Tab 3 → http://localhost:4200/play (different browser or incognito so cached identity doesn't collide), enter "Bob", Join.

Expected:
- Host shows two player tiles, each with a silhouette avatar and the player's name.
- Each player tab shows the lobby with a token grid below the player list.

- [ ] **Step 4: Alice picks an avatar**

In Tab 2, click any token tile.

Expected:
- That tile in Alice's grid gains the gold "mine" border.
- Alice's lobby roster row in all three tabs swaps the silhouette for the picked token art.
- In Bob's grid (Tab 3), that same tile becomes grayed out with "Alice" overlaid.
- Host's player tile for Alice shows the same token art.

- [ ] **Step 5: Bob tries to claim the same avatar (race / forced)**

This shouldn't be possible in the UI (the tile is grayed and `pointer-events: none`), but you can force it via DevTools:

```js
document.querySelector('[data-token-id="<that-id>"]').classList.remove('taken');
document.querySelector('[data-token-id="<that-id>"]').click();
```

Expected: Bob's pick silently fails (no UI change). The browser console shows a `pick rejected: taken` warning. The Lambda log shows `DISPATCH pick_token` followed by no errors.

- [ ] **Step 6: Bob picks a different avatar**

Click a free tile in Bob's grid.

Expected: that tile becomes "mine" for Bob; the host roster updates; Alice's grid grays that tile out.

- [ ] **Step 7: Alice swaps to a different available avatar**

Click another free tile in Alice's grid.

Expected:
- Alice's old token becomes available again across all clients.
- Alice's new token becomes "mine" for her and grayed-out-with-her-name in Bob's grid.

- [ ] **Step 8: Start the game**

In the host tab, click "Start Game".

Expected:
- All clients switch to live phase. Lambda log shows `DISPATCH start_card`.
- The picker disappears from the player tabs (lobby phase ended).
- The host leaderboard and per-player reveal rows show avatars when you advance to the first reveal.

- [ ] **Step 9: Run one full quote cycle to verify reveal avatars**

In host tab: Next Quote → wait for both players to guess in their tabs → Reveal.

Expected: host's reveal panel shows two `.reveal-row`s, each with a small circular avatar on the left, the player's name, their guess, and ✅/❌.

- [ ] **Step 10: Visual regression sweep**

Click around: the brand link, end game, back to lobby. Make sure nothing broke. The "no busy/disabled cursors" rule still holds — taken tiles are grayed, not `cursor: not-allowed`.

No commit for this task — manual verification.

---

## Self-Review (already completed by author)

- **Spec coverage** — every section of [the spec](../specs/2026-05-15-token-avatar-picker-design.md) maps to one or more tasks above. Protocol changes → Tasks 2–3. Server validation + uniqueness → Task 6. Auto-assign at game start → Task 7. Picker UI → Task 11. Avatar display surfaces → Tasks 13–14. Disconnect-frees-token relies on the existing record-cleanup path; no new code required (called out in spec).
- **Placeholder scan** — every TDD step contains actual code or shell commands; no "TBD"s or vague "add validation" steps remain. The two places where existing test patterns are referenced ("translate to the actual mocking style used by the existing tests in this file") are explicitly anchored to a sibling test file the implementer reads, not left blank.
- **Type consistency** — `tokenId: string | null` is used consistently across `PlayerSummary`, `PlayerRow`, `pick_token`, and component inputs. The `Token` interface (`{ id, name, artist, artCropUrl }`) is identical in the script, the JSON output, and the frontend service.

---

**Plan complete and saved to `docs/superpowers/plans/2026-05-15-token-avatar-picker.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
