# Server-Authoritative Sussy Bingo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Sussy Bingo as a jackbox-style party game: TV is host, phones are players, server owns all state (stateless Lambda + DynamoDB), and any client can refresh and resume cleanly.

**Architecture:** Single DynamoDB table holds card session, player rows (with their card + score), per-round guesses, and connections. Lambda routes (`$connect`/`$disconnect`/`$default`) become a state machine dispatching on message `type`. Angular frontend splits `AppComponent` into `LandingComponent`/`PlayerComponent`/`HostComponent` with `IdentityService`, `GameStateService`, `QuoteIngestService`, and a reconnecting `WebSocketService`. See [the design spec](../specs/2026-05-14-server-authoritative-bingo-design.md) for the contract details.

**Tech Stack:** AWS CDK (TS 5.6), Lambda (Node 20, AWS SDK v3, esbuild via NodejsFunction), DynamoDB (single-table), API Gateway WebSocket. Angular 13.3 / TypeScript 4.5, RxJS 7.4, Karma + Jasmine. Vitest added to infra for Lambda unit tests.

---

## Phase 0 — Test infra setup

### Task 1: Add vitest to infra package

The Lambda has no test runner today. We need one before TDD'ing the state machine.

**Files:**
- Modify: `infra/package.json`
- Create: `infra/vitest.config.ts`
- Create: `infra/lambda/__tests__/smoke.test.ts`

- [ ] **Step 1: Add vitest devDependencies**

Modify `infra/package.json` `devDependencies`:

```json
"devDependencies": {
  "@types/aws-lambda": "^8.10.145",
  "@types/node": "^20.0.0",
  "aws-cdk": "^2.170.0",
  "aws-sdk-client-mock": "^4.1.0",
  "ts-node": "^10.9.2",
  "typescript": "~5.6.2",
  "vitest": "^2.1.0"
}
```

And add a script entry:

```json
"scripts": {
  "build": "tsc",
  "cdk": "cdk",
  "synth": "cdk synth",
  "deploy": "cdk deploy",
  "destroy": "cdk destroy",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 2: Add `infra/vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['lambda/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 3: Write failing smoke test `infra/lambda/__tests__/smoke.test.ts`**

```ts
import { describe, it, expect } from 'vitest';

describe('infra test runner', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 4: Install and run**

Run:
```
cd infra && npm install && npm test
```
Expected: 1 test passes.

- [ ] **Step 5: Commit**

```
git add infra/package.json infra/package-lock.json infra/vitest.config.ts infra/lambda/__tests__/smoke.test.ts
git commit -m "Add vitest to infra package"
```

---

## Phase 1 — Backend foundations

### Task 2: Shared protocol module

Single source of truth for message types, used by both Lambda and (later) frontend.

**Files:**
- Create: `infra/lambda/protocol.ts`
- Create: `infra/lambda/__tests__/protocol.test.ts`

- [ ] **Step 1: Write failing test `infra/lambda/__tests__/protocol.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { isClientMessage } from '../protocol';

describe('isClientMessage', () => {
  it('accepts a join message', () => {
    expect(isClientMessage({ type: 'join', name: 'Andrew' })).toBe(true);
  });
  it('rejects no type', () => {
    expect(isClientMessage({ name: 'Andrew' })).toBe(false);
  });
  it('rejects null', () => {
    expect(isClientMessage(null)).toBe(false);
  });
});
```

- [ ] **Step 2: Run test — should fail (module missing)**

Run: `cd infra && npm test`
Expected: import error / fail.

- [ ] **Step 3: Implement `infra/lambda/protocol.ts`**

```ts
export type Role = 'host' | 'player';
export type Phase = 'lobby' | 'live';

export interface NameWeight { name: string; weight: number; }

// Client → Server
export type ClientMessage =
  | { type: 'join'; name: string; playerId?: string }
  | { type: 'host_hello' }
  | { type: 'start_card'; weights: NameWeight[] }
  | { type: 'next_quote'; quote: string; possibleAnswers: string[] }
  | { type: 'guess'; quoteIndex: number; guess: string }
  | { type: 'reveal'; truth: string }
  | { type: 'end_game' };

// Server → Client
export type ServerMessage =
  | { type: 'joined'; playerId: string; cardId: string; phase: Phase; name: string; score: number;
      card: string[][] | null; currentQuote: { index: number; quote: string; possibleAnswers: string[] } | null;
      yourGuess: string | null; leaderboard: LeaderboardEntry[]; players: PlayerSummary[] }
  | { type: 'host_state'; cardId: string; phase: Phase;
      currentQuote: { index: number; quote: string; possibleAnswers: string[] } | null;
      leaderboard: LeaderboardEntry[]; players: PlayerSummary[] }
  | { type: 'lobby_update'; players: PlayerSummary[] }
  | { type: 'card_started'; cardId: string; leaderboard: LeaderboardEntry[] }
  | { type: 'your_card'; card: string[][] }
  | { type: 'quote'; index: number; quote: string; possibleAnswers: string[] }
  | { type: 'guess_ack'; quoteIndex: number; guess: string }
  | { type: 'guess_rejected'; quoteIndex: number; reason: 'too_late' | 'unknown_quote' | 'not_a_player' }
  | { type: 'reveal'; index: number; truth: string;
      perPlayer: { playerId: string; name: string; guess: string | null; correct: boolean }[];
      leaderboard: LeaderboardEntry[] }
  | { type: 'returned_to_lobby'; players: PlayerSummary[] }
  | { type: 'error'; reason: string };

export interface LeaderboardEntry { playerId: string; name: string; score: number; }
export interface PlayerSummary { playerId: string; name: string; }

export function isClientMessage(value: unknown): value is ClientMessage {
  if (!value || typeof value !== 'object') return false;
  const t = (value as { type?: unknown }).type;
  return typeof t === 'string';
}
```

- [ ] **Step 4: Run test — should pass**

Run: `cd infra && npm test`
Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```
git add infra/lambda/protocol.ts infra/lambda/__tests__/protocol.test.ts
git commit -m "Add shared protocol types for client/server messages"
```

---

### Task 3: Add SussyBingoState DynamoDB table to CDK stack

The old `sussy-bingo-connections` table only had `connectionId`. We need a composite-key table for the full game state. Replace it.

**Files:**
- Modify: `infra/lib/sussy-bingo-stack.ts`

- [ ] **Step 1: Edit `infra/lib/sussy-bingo-stack.ts`**

Replace the `connectionsTable` definition and lambda env wiring:

```ts
const stateTable = new dynamodb.Table(this, 'GameState', {
  tableName: 'sussy-bingo-state',
  partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
  sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
  billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  timeToLiveAttribute: 'ttl',
  removalPolicy: cdk.RemovalPolicy.DESTROY,
});

const handlerFn = new nodejs.NodejsFunction(this, 'WebSocketHandler', {
  runtime: lambda.Runtime.NODEJS_20_X,
  entry: path.join(__dirname, '..', 'lambda', 'handler.ts'),
  handler: 'handler',
  timeout: cdk.Duration.seconds(10),
  memorySize: 256,
  environment: {
    TABLE_NAME: stateTable.tableName,
  },
  bundling: {
    minify: true,
    sourceMap: true,
  },
});

stateTable.grantReadWriteData(handlerFn);
```

Note: `entry` now points to `handler.ts` (new entry file we'll create in Task 7). The old `websocket-handler.ts` will be deleted later in Task 7.

- [ ] **Step 2: Synth to confirm CDK still compiles**

Run: `cd infra && npx cdk synth > /dev/null`
Expected: exits 0. Warnings about handler.ts missing are OK if synth still succeeds; if it fails because the entry file is referenced, stub a one-line `infra/lambda/handler.ts` containing `export const handler = async () => ({ statusCode: 200 });` and re-run. Keep that stub for Task 7 to overwrite.

- [ ] **Step 3: Commit**

```
git add infra/lib/sussy-bingo-stack.ts infra/lambda/handler.ts
git commit -m "Replace connections table with single-table GameState; point at new handler entry"
```

Do **not** deploy yet — keys + state layer come next, deploy is Task 16.

---

### Task 4: State layer — keys + getCardSession + ensureLobby

**Files:**
- Create: `infra/lambda/state.ts`
- Create: `infra/lambda/keys.ts`
- Create: `infra/lambda/__tests__/state.test.ts`

- [ ] **Step 1: Write `infra/lambda/keys.ts`**

```ts
export const CARD_PK = 'CARD';
export const CARD_CURRENT_SK = 'CURRENT';
export const CONN_PK = 'CONN';

export const cardScopedPK = (cardId: string) => `CARD#${cardId}`;
export const playerSK = (playerId: string) => `PLAYER#${playerId}`;
export const quoteSK = (index: number) => `QUOTE#${index}`;

export const TTL_SECONDS = 6 * 60 * 60; // 6h
export const ttl = () => Math.floor(Date.now() / 1000) + TTL_SECONDS;
```

- [ ] **Step 2: Write failing test `infra/lambda/__tests__/state.test.ts`**

```ts
import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { ensureLobby, getCardSession } from '../state';

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => { ddbMock.reset(); process.env.TABLE_NAME = 'TestTable'; });

describe('ensureLobby', () => {
  it('creates a new lobby when no current card exists', async () => {
    ddbMock.on(GetCommand).resolves({ Item: undefined });
    ddbMock.on(PutCommand).resolves({});
    const sess = await ensureLobby();
    expect(sess.phase).toBe('lobby');
    expect(sess.cardId).toMatch(/[a-z0-9-]{6,}/);
    expect(ddbMock.commandCalls(PutCommand).length).toBe(1);
  });

  it('returns existing session when one exists', async () => {
    ddbMock.on(GetCommand).resolves({
      Item: { PK: 'CARD', SK: 'CURRENT', cardId: 'abc123', phase: 'live', currentQuoteIndex: 2 },
    });
    const sess = await ensureLobby();
    expect(sess.cardId).toBe('abc123');
    expect(sess.phase).toBe('live');
    expect(ddbMock.commandCalls(PutCommand).length).toBe(0);
  });
});

describe('getCardSession', () => {
  it('returns null when nothing exists', async () => {
    ddbMock.on(GetCommand).resolves({ Item: undefined });
    expect(await getCardSession()).toBeNull();
  });
});
```

- [ ] **Step 3: Run test — fail (module missing)**

Run: `cd infra && npm test`
Expected: fail.

- [ ] **Step 4: Implement `infra/lambda/state.ts` (this file grows across tasks 4–6; start with):**

```ts
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';
import { CARD_PK, CARD_CURRENT_SK, ttl } from './keys';
import { Phase } from './protocol';

const TABLE = () => process.env.TABLE_NAME!;
export const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export interface CardSession {
  cardId: string;
  phase: Phase;
  currentQuoteIndex: number;
  weights?: { name: string; weight: number }[];
}

export async function getCardSession(): Promise<CardSession | null> {
  const res = await ddb.send(new GetCommand({
    TableName: TABLE(),
    Key: { PK: CARD_PK, SK: CARD_CURRENT_SK },
  }));
  if (!res.Item) return null;
  return {
    cardId: res.Item.cardId,
    phase: res.Item.phase,
    currentQuoteIndex: res.Item.currentQuoteIndex ?? 0,
    weights: res.Item.weights,
  };
}

export async function ensureLobby(): Promise<CardSession> {
  const existing = await getCardSession();
  if (existing) return existing;
  const sess: CardSession = {
    cardId: randomUUID(),
    phase: 'lobby',
    currentQuoteIndex: 0,
  };
  await ddb.send(new PutCommand({
    TableName: TABLE(),
    Item: { PK: CARD_PK, SK: CARD_CURRENT_SK, ...sess, ttl: ttl() },
  }));
  return sess;
}

export async function writeCardSession(sess: CardSession): Promise<void> {
  await ddb.send(new PutCommand({
    TableName: TABLE(),
    Item: { PK: CARD_PK, SK: CARD_CURRENT_SK, ...sess, ttl: ttl() },
  }));
}
```

- [ ] **Step 5: Run test — pass**

Run: `cd infra && npm test`
Expected: 3 state tests + 4 protocol tests + 1 smoke pass.

- [ ] **Step 6: Commit**

```
git add infra/lambda/keys.ts infra/lambda/state.ts infra/lambda/__tests__/state.test.ts
git commit -m "State layer: card session keys, getCardSession, ensureLobby"
```

---

### Task 5: State layer — player ops

**Files:**
- Modify: `infra/lambda/state.ts`
- Modify: `infra/lambda/__tests__/state.test.ts`

- [ ] **Step 1: Add failing tests** (append to `state.test.ts`):

```ts
import {
  putPlayer, getPlayer, listPlayers, generateCard, deletePlayerCard,
} from '../state';
import { QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

describe('generateCard', () => {
  it('produces a width×height grid from weighted names', () => {
    const grid = generateCard(
      [{ name: 'A', weight: 10 }, { name: 'B', weight: 1 }],
      5, 5,
      () => 0, // always rolls index 0
    );
    expect(grid.length).toBe(5);
    expect(grid[0].length).toBe(5);
    expect(grid.flat().every(name => name === 'A')).toBe(true);
  });
});

describe('putPlayer / getPlayer', () => {
  it('round-trips a player row', async () => {
    ddbMock.on(PutCommand).resolves({});
    ddbMock.on(GetCommand).resolves({ Item: { name: 'Andrew', score: 3, card: null } });
    await putPlayer('card1', { playerId: 'p1', name: 'Andrew', score: 0, card: null });
    const p = await getPlayer('card1', 'p1');
    expect(p?.name).toBe('Andrew');
  });
});

describe('listPlayers', () => {
  it('queries by cardId partition', async () => {
    ddbMock.on(QueryCommand).resolves({
      Items: [
        { playerId: 'p1', name: 'A', score: 2 },
        { playerId: 'p2', name: 'B', score: 0 },
      ],
    });
    const players = await listPlayers('card1');
    expect(players.length).toBe(2);
    expect(players[0].name).toBe('A');
  });
});
```

- [ ] **Step 2: Run tests — should fail**

Run: `cd infra && npm test`
Expected: import errors.

- [ ] **Step 3: Extend `infra/lambda/state.ts`**

Add imports:

```ts
import { QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { cardScopedPK, playerSK } from './keys';
import { NameWeight } from './protocol';
```

Add to the file:

```ts
export interface PlayerRow {
  playerId: string;
  name: string;
  score: number;
  card: string[][] | null;
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
  }));
}

export async function deletePlayerCard(cardId: string, playerId: string): Promise<void> {
  const p = await getPlayer(cardId, playerId);
  if (!p) return;
  await putPlayer(cardId, { ...p, card: null, score: 0 });
}

export function generateCard(
  weights: NameWeight[],
  width: number,
  height: number,
  rand: () => number = Math.random,
): string[][] {
  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
  if (totalWeight <= 0) throw new Error('weights total to zero');
  const pickOne = (): string => {
    let roll = rand() * totalWeight;
    for (const { name, weight } of weights) {
      roll -= weight;
      if (roll <= 0) return name;
    }
    return weights[weights.length - 1].name;
  };
  const grid: string[][] = [];
  for (let r = 0; r < height; r++) {
    const row: string[] = [];
    for (let c = 0; c < width; c++) row.push(pickOne());
    grid.push(row);
  }
  return grid;
}
```

- [ ] **Step 4: Run tests — pass**

Run: `cd infra && npm test`
Expected: all green.

- [ ] **Step 5: Commit**

```
git add infra/lambda/state.ts infra/lambda/__tests__/state.test.ts
git commit -m "State layer: player ops and weighted card generation"
```

---

### Task 6: State layer — quote round ops with conditional guess write

**Files:**
- Modify: `infra/lambda/state.ts`
- Modify: `infra/lambda/__tests__/state.test.ts`

- [ ] **Step 1: Add failing tests** (append):

```ts
import {
  createQuoteRound, getQuoteRound, recordGuess, markRevealed,
} from '../state';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';

describe('createQuoteRound', () => {
  it('writes the round at QUOTE#<index>', async () => {
    ddbMock.on(PutCommand).resolves({});
    await createQuoteRound('card1', 1, 'q', ['a', 'b', 'c', 'd']);
    const call = ddbMock.commandCalls(PutCommand).at(-1);
    expect(call?.args[0].input.Item?.quote).toBe('q');
    expect(call?.args[0].input.Item?.revealed).toBe(false);
  });
});

describe('recordGuess', () => {
  it('returns "ok" on a fresh guess', async () => {
    ddbMock.on(UpdateCommand).resolves({});
    expect(await recordGuess('card1', 1, 'p1', 'Andrew')).toBe('ok');
  });
  it('returns "too_late" when conditional check fails', async () => {
    ddbMock.on(UpdateCommand).rejects(
      new ConditionalCheckFailedException({ message: 'cond', $metadata: {} }),
    );
    expect(await recordGuess('card1', 1, 'p1', 'Andrew')).toBe('too_late');
  });
});
```

- [ ] **Step 2: Run — fail**

Run: `cd infra && npm test`
Expected: import errors.

- [ ] **Step 3: Extend `infra/lambda/state.ts`**

Add imports:

```ts
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { quoteSK } from './keys';
```

Add:

```ts
export interface QuoteRound {
  index: number;
  quote: string;
  possibleAnswers: string[];
  truth: string | null;
  guesses: Record<string, string>;
  revealed: boolean;
}

export async function createQuoteRound(
  cardId: string, index: number, quote: string, possibleAnswers: string[],
): Promise<void> {
  await ddb.send(new PutCommand({
    TableName: TABLE(),
    Item: {
      PK: cardScopedPK(cardId), SK: quoteSK(index),
      index, quote, possibleAnswers,
      truth: null, guesses: {}, revealed: false,
      ttl: ttl(),
    },
  }));
}

export async function getQuoteRound(cardId: string, index: number): Promise<QuoteRound | null> {
  const res = await ddb.send(new GetCommand({
    TableName: TABLE(),
    Key: { PK: cardScopedPK(cardId), SK: quoteSK(index) },
  }));
  if (!res.Item) return null;
  return {
    index: res.Item.index,
    quote: res.Item.quote,
    possibleAnswers: res.Item.possibleAnswers ?? [],
    truth: res.Item.truth ?? null,
    guesses: res.Item.guesses ?? {},
    revealed: res.Item.revealed ?? false,
  };
}

export async function recordGuess(
  cardId: string, index: number, playerId: string, guess: string,
): Promise<'ok' | 'too_late' | 'unknown_quote'> {
  try {
    await ddb.send(new UpdateCommand({
      TableName: TABLE(),
      Key: { PK: cardScopedPK(cardId), SK: quoteSK(index) },
      UpdateExpression: 'SET guesses.#pid = :g',
      ConditionExpression: 'attribute_exists(SK) AND revealed = :false',
      ExpressionAttributeNames: { '#pid': playerId },
      ExpressionAttributeValues: { ':g': guess, ':false': false },
    }));
    return 'ok';
  } catch (err) {
    if (err instanceof ConditionalCheckFailedException) {
      // Could be revealed=true OR missing row. Distinguish:
      const round = await getQuoteRound(cardId, index);
      return round ? 'too_late' : 'unknown_quote';
    }
    throw err;
  }
}

export async function markRevealed(
  cardId: string, index: number, truth: string,
): Promise<void> {
  await ddb.send(new UpdateCommand({
    TableName: TABLE(),
    Key: { PK: cardScopedPK(cardId), SK: quoteSK(index) },
    UpdateExpression: 'SET truth = :t, revealed = :true',
    ExpressionAttributeValues: { ':t': truth, ':true': true },
  }));
}
```

- [ ] **Step 4: Run — pass**

Run: `cd infra && npm test`
Expected: all green.

- [ ] **Step 5: Commit**

```
git add infra/lambda/state.ts infra/lambda/__tests__/state.test.ts
git commit -m "State layer: quote rounds with conditional guess writes"
```

---

## Phase 2 — Backend handlers

### Task 7: Handler entry — router + connect/disconnect

Replace the old `websocket-handler.ts` with `handler.ts` that dispatches on message `type`.

**Files:**
- Create: `infra/lambda/handler.ts` (overwrite the stub from Task 3)
- Create: `infra/lambda/connections.ts`
- Create: `infra/lambda/__tests__/connections.test.ts`
- Delete: `infra/lambda/websocket-handler.ts`

- [ ] **Step 1: Failing test `infra/lambda/__tests__/connections.test.ts`**

```ts
import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, PutCommand, DeleteCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { putConnection, deleteConnection, getConnection, attachPlayer } from '../connections';

const ddbMock = mockClient(DynamoDBDocumentClient);
beforeEach(() => { ddbMock.reset(); process.env.TABLE_NAME = 'TestTable'; });

it('putConnection writes a CONN row', async () => {
  ddbMock.on(PutCommand).resolves({});
  await putConnection('c1');
  expect(ddbMock.commandCalls(PutCommand).length).toBe(1);
});

it('deleteConnection removes the row', async () => {
  ddbMock.on(DeleteCommand).resolves({});
  await deleteConnection('c1');
  expect(ddbMock.commandCalls(DeleteCommand).length).toBe(1);
});

it('attachPlayer sets role and playerId', async () => {
  ddbMock.on(PutCommand).resolves({});
  await attachPlayer('c1', 'p1', 'card1', 'player');
  const item = ddbMock.commandCalls(PutCommand).at(-1)?.args[0].input.Item;
  expect(item?.role).toBe('player');
  expect(item?.playerId).toBe('p1');
});
```

- [ ] **Step 2: Run — fail**

Run: `cd infra && npm test`

- [ ] **Step 3: Write `infra/lambda/connections.ts`**

```ts
import { DeleteCommand, GetCommand, PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { CONN_PK, ttl } from './keys';
import { Role } from './protocol';
import { ddb } from './state';

const TABLE = () => process.env.TABLE_NAME!;

export interface ConnectionRow {
  connectionId: string;
  role?: Role;
  playerId?: string;
  cardId?: string;
}

export async function putConnection(connectionId: string): Promise<void> {
  await ddb.send(new PutCommand({
    TableName: TABLE(),
    Item: { PK: CONN_PK, SK: connectionId, connectionId, ttl: ttl() },
  }));
}

export async function attachPlayer(
  connectionId: string, playerId: string, cardId: string, role: Role,
): Promise<void> {
  await ddb.send(new PutCommand({
    TableName: TABLE(),
    Item: { PK: CONN_PK, SK: connectionId, connectionId, playerId, cardId, role, ttl: ttl() },
  }));
}

export async function getConnection(connectionId: string): Promise<ConnectionRow | null> {
  const res = await ddb.send(new GetCommand({
    TableName: TABLE(),
    Key: { PK: CONN_PK, SK: connectionId },
  }));
  if (!res.Item) return null;
  return {
    connectionId,
    role: res.Item.role,
    playerId: res.Item.playerId,
    cardId: res.Item.cardId,
  };
}

export async function deleteConnection(connectionId: string): Promise<void> {
  await ddb.send(new DeleteCommand({
    TableName: TABLE(),
    Key: { PK: CONN_PK, SK: connectionId },
  }));
}

export async function listAllConnections(): Promise<ConnectionRow[]> {
  const res = await ddb.send(new QueryCommand({
    TableName: TABLE(),
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: { ':pk': CONN_PK },
  }));
  return (res.Items ?? []).map(i => ({
    connectionId: i.connectionId,
    role: i.role, playerId: i.playerId, cardId: i.cardId,
  }));
}
```

- [ ] **Step 4: Write `infra/lambda/handler.ts`** (replaces the stub)

```ts
import type {
  APIGatewayProxyWebsocketEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import { isClientMessage, ClientMessage } from './protocol';
import { putConnection, deleteConnection } from './connections';

export const handler = async (
  event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyResultV2> => {
  const { routeKey, connectionId, domainName, stage } = event.requestContext;
  const endpoint = `https://${domainName}/${stage}`;

  try {
    if (routeKey === '$connect') {
      await putConnection(connectionId);
      return { statusCode: 200, body: 'connected' };
    }
    if (routeKey === '$disconnect') {
      await deleteConnection(connectionId);
      return { statusCode: 200, body: 'disconnected' };
    }
    // $default
    const msg = parseClientMessage(event.body ?? '');
    if (!msg) return { statusCode: 200, body: 'bad-message' };
    await dispatch(msg, connectionId, endpoint);
    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    console.error('handler error', { routeKey, connectionId, err });
    return { statusCode: 200, body: 'error-logged' };
  }
};

function parseClientMessage(raw: string): ClientMessage | null {
  try {
    const outer = JSON.parse(raw);
    const inner = outer && typeof outer === 'object' && 'body' in outer ? outer.body : outer;
    return isClientMessage(inner) ? inner : null;
  } catch { return null; }
}

async function dispatch(_msg: ClientMessage, _connId: string, _endpoint: string): Promise<void> {
  // Filled in by Tasks 9–15.
}
```

- [ ] **Step 5: Delete the old `infra/lambda/websocket-handler.ts`**

```
git rm infra/lambda/websocket-handler.ts
```

- [ ] **Step 6: Run tests — pass**

Run: `cd infra && npm test`
Expected: all green.

- [ ] **Step 7: Commit**

```
git add infra/lambda/handler.ts infra/lambda/connections.ts infra/lambda/__tests__/connections.test.ts
git commit -m "Replace relay handler with type-dispatching router; connection state layer"
```

---

### Task 8: Broadcast helper

**Files:**
- Create: `infra/lambda/broadcast.ts`
- Create: `infra/lambda/__tests__/broadcast.test.ts`

- [ ] **Step 1: Failing test**

```ts
import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { ApiGatewayManagementApiClient, PostToConnectionCommand, GoneException } from '@aws-sdk/client-apigatewaymanagementapi';
import { DynamoDBDocumentClient, QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { broadcastToAll, sendTo } from '../broadcast';

const apiMock = mockClient(ApiGatewayManagementApiClient);
const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => { apiMock.reset(); ddbMock.reset(); process.env.TABLE_NAME = 'T'; });

it('broadcastToAll sends to every CONN row', async () => {
  ddbMock.on(QueryCommand).resolves({ Items: [
    { connectionId: 'c1' }, { connectionId: 'c2' }, { connectionId: 'c3' },
  ]});
  apiMock.on(PostToConnectionCommand).resolves({});
  await broadcastToAll('https://example/prod', { type: 'lobby_update', players: [] } as any);
  expect(apiMock.commandCalls(PostToConnectionCommand).length).toBe(3);
});

it('broadcastToAll cleans up Gone connections', async () => {
  ddbMock.on(QueryCommand).resolves({ Items: [{ connectionId: 'c1' }, { connectionId: 'c2' }] });
  apiMock.on(PostToConnectionCommand)
    .resolvesOnce({})
    .rejectsOnce(new GoneException({ message: 'gone', $metadata: {} }));
  ddbMock.on(DeleteCommand).resolves({});
  await broadcastToAll('https://example/prod', { type: 'lobby_update', players: [] } as any);
  expect(ddbMock.commandCalls(DeleteCommand).length).toBe(1);
});

it('sendTo posts to a single connection', async () => {
  apiMock.on(PostToConnectionCommand).resolves({});
  await sendTo('https://example/prod', 'c1', { type: 'joined' } as any);
  expect(apiMock.commandCalls(PostToConnectionCommand).length).toBe(1);
});
```

- [ ] **Step 2: Run — fail**

- [ ] **Step 3: Implement `infra/lambda/broadcast.ts`**

```ts
import {
  ApiGatewayManagementApiClient, PostToConnectionCommand, GoneException,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { ServerMessage } from './protocol';
import { listAllConnections, deleteConnection, ConnectionRow } from './connections';

export async function sendTo(endpoint: string, connectionId: string, msg: ServerMessage): Promise<void> {
  const apigw = new ApiGatewayManagementApiClient({ endpoint });
  try {
    await apigw.send(new PostToConnectionCommand({
      ConnectionId: connectionId,
      Data: Buffer.from(JSON.stringify(msg)),
    }));
  } catch (err) {
    if (err instanceof GoneException) {
      await deleteConnection(connectionId).catch(() => {});
    } else { throw err; }
  }
}

export async function broadcastToAll(endpoint: string, msg: ServerMessage): Promise<void> {
  const conns = await listAllConnections();
  await postMany(endpoint, conns, msg);
}

export async function broadcastWhere(
  endpoint: string,
  predicate: (c: ConnectionRow) => boolean,
  msg: ServerMessage,
): Promise<void> {
  const conns = (await listAllConnections()).filter(predicate);
  await postMany(endpoint, conns, msg);
}

async function postMany(endpoint: string, conns: ConnectionRow[], msg: ServerMessage): Promise<void> {
  const apigw = new ApiGatewayManagementApiClient({ endpoint });
  const payload = Buffer.from(JSON.stringify(msg));
  await Promise.all(conns.map(async (c) => {
    try {
      await apigw.send(new PostToConnectionCommand({ ConnectionId: c.connectionId, Data: payload }));
    } catch (err) {
      if (err instanceof GoneException) {
        await deleteConnection(c.connectionId).catch(() => {});
      } else {
        console.error('post failed', { id: c.connectionId, err });
      }
    }
  }));
}
```

- [ ] **Step 4: Run — pass**
- [ ] **Step 5: Commit**

```
git add infra/lambda/broadcast.ts infra/lambda/__tests__/broadcast.test.ts
git commit -m "Add broadcast helper with Gone-connection cleanup"
```

---

### Task 9: `join` handler

**Files:**
- Create: `infra/lambda/handlers/join.ts`
- Modify: `infra/lambda/handler.ts` (wire dispatch)
- Create: `infra/lambda/__tests__/join.test.ts`

- [ ] **Step 1: Failing test `infra/lambda/__tests__/join.test.ts`**

```ts
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { handleJoin } from '../handlers/join';

const ddbMock = mockClient(DynamoDBDocumentClient);
const apiMock = mockClient(ApiGatewayManagementApiClient);

beforeEach(() => { ddbMock.reset(); apiMock.reset(); process.env.TABLE_NAME = 'T'; });

it('issues a new playerId when none provided, creates lobby if missing, broadcasts lobby_update', async () => {
  ddbMock.on(GetCommand).resolves({ Item: undefined }); // no card session, no existing player
  ddbMock.on(PutCommand).resolves({});
  ddbMock.on(QueryCommand).resolves({ Items: [{ connectionId: 'c1', playerId: 'pX', name: 'Andrew' }] });
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleJoin({ type: 'join', name: 'Andrew' }, 'c1', 'https://x/prod');

  const posts = apiMock.commandCalls(PostToConnectionCommand);
  // Two outgoing: one `joined` direct, one `lobby_update` broadcast (to itself)
  expect(posts.length).toBeGreaterThanOrEqual(2);
  const types = posts.map(p => JSON.parse(p.args[0].input.Data!.toString()).type);
  expect(types).toContain('joined');
  expect(types).toContain('lobby_update');
});
```

- [ ] **Step 2: Run — fail**

- [ ] **Step 3: Implement `infra/lambda/handlers/join.ts`**

```ts
import { randomUUID } from 'crypto';
import { ClientMessage, LeaderboardEntry, PlayerSummary } from '../protocol';
import { ensureLobby, getPlayer, putPlayer, listPlayers, getQuoteRound, generateCard } from '../state';
import { attachPlayer, getConnection } from '../connections';
import { sendTo, broadcastToAll } from '../broadcast';

export async function handleJoin(
  msg: Extract<ClientMessage, { type: 'join' }>,
  connectionId: string,
  endpoint: string,
): Promise<void> {
  const session = await ensureLobby();

  let playerId = msg.playerId;
  let player = playerId ? await getPlayer(session.cardId, playerId) : null;

  if (!player) {
    playerId = randomUUID();
    let card: string[][] | null = null;
    if (session.phase === 'live' && session.weights) {
      card = generateCard(session.weights, 5, 5);
    }
    player = { playerId, name: msg.name, score: 0, card };
    await putPlayer(session.cardId, player);
  } else if (player.name !== msg.name) {
    player = { ...player, name: msg.name };
    await putPlayer(session.cardId, player);
  }

  await attachPlayer(connectionId, player.playerId, session.cardId, 'player');

  // Compute current state for direct reply.
  const players = await listPlayers(session.cardId);
  const leaderboard: LeaderboardEntry[] = players
    .map(p => ({ playerId: p.playerId, name: p.name, score: p.score }))
    .sort((a, b) => b.score - a.score);
  const summaries: PlayerSummary[] = players.map(p => ({ playerId: p.playerId, name: p.name }));

  let currentQuote = null;
  let yourGuess: string | null = null;
  if (session.phase === 'live' && session.currentQuoteIndex > 0) {
    const round = await getQuoteRound(session.cardId, session.currentQuoteIndex);
    if (round && !round.revealed) {
      currentQuote = { index: round.index, quote: round.quote, possibleAnswers: round.possibleAnswers };
      yourGuess = round.guesses[player.playerId] ?? null;
    }
  }

  await sendTo(endpoint, connectionId, {
    type: 'joined',
    playerId: player.playerId,
    cardId: session.cardId,
    phase: session.phase,
    name: player.name,
    score: player.score,
    card: player.card,
    currentQuote,
    yourGuess,
    leaderboard,
    players: summaries,
  });

  await broadcastToAll(endpoint, { type: 'lobby_update', players: summaries });
}
```

- [ ] **Step 4: Wire dispatch in `infra/lambda/handler.ts`**

Replace `async function dispatch` with:

```ts
import { handleJoin } from './handlers/join';

async function dispatch(msg: ClientMessage, connId: string, endpoint: string): Promise<void> {
  switch (msg.type) {
    case 'join': return handleJoin(msg, connId, endpoint);
    default:
      console.warn('unhandled message type', msg.type);
  }
}
```

- [ ] **Step 5: Run tests — pass**
- [ ] **Step 6: Commit**

```
git add infra/lambda/handlers/join.ts infra/lambda/handler.ts infra/lambda/__tests__/join.test.ts
git commit -m "Handler: join creates/rejoins player, broadcasts lobby_update"
```

---

### Task 10: `host_hello` handler

**Files:**
- Create: `infra/lambda/handlers/hostHello.ts`
- Modify: `infra/lambda/handler.ts`
- Create: `infra/lambda/__tests__/hostHello.test.ts`

- [ ] **Step 1: Failing test**

```ts
import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { handleHostHello } from '../handlers/hostHello';

const ddbMock = mockClient(DynamoDBDocumentClient);
const apiMock = mockClient(ApiGatewayManagementApiClient);
beforeEach(() => { ddbMock.reset(); apiMock.reset(); process.env.TABLE_NAME = 'T'; });

it('attaches host role and sends host_state', async () => {
  ddbMock.on(GetCommand).resolves({ Item: undefined });
  ddbMock.on(PutCommand).resolves({});
  ddbMock.on(QueryCommand).resolves({ Items: [] });
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleHostHello('c1', 'https://x/prod');

  const sent = JSON.parse(apiMock.commandCalls(PostToConnectionCommand)[0].args[0].input.Data!.toString());
  expect(sent.type).toBe('host_state');
  expect(sent.phase).toBe('lobby');
});
```

- [ ] **Step 2: Implement `infra/lambda/handlers/hostHello.ts`**

```ts
import { ensureLobby, listPlayers, getQuoteRound } from '../state';
import { attachPlayer } from '../connections';
import { sendTo } from '../broadcast';
import { LeaderboardEntry, PlayerSummary } from '../protocol';

export async function handleHostHello(connectionId: string, endpoint: string): Promise<void> {
  const session = await ensureLobby();
  await attachPlayer(connectionId, 'HOST', session.cardId, 'host');

  const players = await listPlayers(session.cardId);
  const leaderboard: LeaderboardEntry[] = players
    .map(p => ({ playerId: p.playerId, name: p.name, score: p.score }))
    .sort((a, b) => b.score - a.score);
  const summaries: PlayerSummary[] = players.map(p => ({ playerId: p.playerId, name: p.name }));

  let currentQuote = null;
  if (session.phase === 'live' && session.currentQuoteIndex > 0) {
    const round = await getQuoteRound(session.cardId, session.currentQuoteIndex);
    if (round && !round.revealed) {
      currentQuote = { index: round.index, quote: round.quote, possibleAnswers: round.possibleAnswers };
    }
  }

  await sendTo(endpoint, connectionId, {
    type: 'host_state',
    cardId: session.cardId,
    phase: session.phase,
    currentQuote,
    leaderboard,
    players: summaries,
  });
}
```

- [ ] **Step 3: Wire dispatch**

Add to `handler.ts`:

```ts
import { handleHostHello } from './handlers/hostHello';
// inside switch:
case 'host_hello': return handleHostHello(connId, endpoint);
```

- [ ] **Step 4: Run + commit**

```
cd infra && npm test
git add infra/lambda/handlers/hostHello.ts infra/lambda/handler.ts infra/lambda/__tests__/hostHello.test.ts
git commit -m "Handler: host_hello registers host role and replies with host_state"
```

---

### Task 11: `start_card` handler

**Files:**
- Create: `infra/lambda/handlers/startCard.ts`
- Modify: `infra/lambda/handler.ts`
- Create: `infra/lambda/__tests__/startCard.test.ts`

- [ ] **Step 1: Failing test**

```ts
import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { handleStartCard } from '../handlers/startCard';

const ddbMock = mockClient(DynamoDBDocumentClient);
const apiMock = mockClient(ApiGatewayManagementApiClient);
beforeEach(() => { ddbMock.reset(); apiMock.reset(); process.env.TABLE_NAME = 'T'; });

it('rejects if caller is not host', async () => {
  ddbMock.on(GetCommand).resolves({ Item: { role: 'player' } });
  apiMock.on(PostToConnectionCommand).resolves({});
  await handleStartCard({ type: 'start_card', weights: [{ name: 'A', weight: 1 }] }, 'c1', 'https://x/prod');
  // No card-state writes should have happened
  const stateWrites = ddbMock.commandCalls(PutCommand).filter(c =>
    c.args[0].input.Item?.PK === 'CARD');
  expect(stateWrites.length).toBe(0);
});

it('generates cards for all players and broadcasts card_started', async () => {
  ddbMock.on(GetCommand)
    .resolvesOnce({ Item: { role: 'host', cardId: 'card1' } }) // connection lookup
    .resolves({ Item: { PK: 'CARD', SK: 'CURRENT', cardId: 'card1', phase: 'lobby', currentQuoteIndex: 0 } });
  ddbMock.on(QueryCommand).resolves({ Items: [
    { playerId: 'p1', name: 'A', score: 0 },
    { playerId: 'p2', name: 'B', score: 0 },
  ]});
  ddbMock.on(PutCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleStartCard(
    { type: 'start_card', weights: [{ name: 'A', weight: 1 }] },
    'c1', 'https://x/prod',
  );

  const types = apiMock.commandCalls(PostToConnectionCommand)
    .map(c => JSON.parse(c.args[0].input.Data!.toString()).type);
  expect(types).toContain('card_started');
  expect(types.filter(t => t === 'your_card').length).toBe(2);
});
```

- [ ] **Step 2: Implement `infra/lambda/handlers/startCard.ts`**

```ts
import { ClientMessage, LeaderboardEntry } from '../protocol';
import { getCardSession, writeCardSession, listPlayers, putPlayer, generateCard } from '../state';
import { getConnection, listAllConnections } from '../connections';
import { broadcastToAll, sendTo } from '../broadcast';

export async function handleStartCard(
  msg: Extract<ClientMessage, { type: 'start_card' }>,
  connectionId: string,
  endpoint: string,
): Promise<void> {
  const conn = await getConnection(connectionId);
  if (conn?.role !== 'host') {
    await sendTo(endpoint, connectionId, { type: 'error', reason: 'not_host' });
    return;
  }
  const session = await getCardSession();
  if (!session) return;

  // Reset scores + regenerate cards for every existing player.
  // Track the freshly-generated cards locally so we can deliver them without re-reading.
  const players = await listPlayers(session.cardId);
  const newCards = new Map<string, string[][]>();
  for (const p of players) {
    const card = generateCard(msg.weights, 5, 5);
    newCards.set(p.playerId, card);
    await putPlayer(session.cardId, { ...p, score: 0, card });
  }

  await writeCardSession({
    ...session,
    phase: 'live',
    weights: msg.weights,
    currentQuoteIndex: 0,
  });

  const leaderboard: LeaderboardEntry[] = players
    .map(p => ({ playerId: p.playerId, name: p.name, score: 0 }))
    .sort((a, b) => a.name.localeCompare(b.name));

  await broadcastToAll(endpoint, {
    type: 'card_started', cardId: session.cardId, leaderboard,
  });

  // Per-player your_card delivery
  const conns = await listAllConnections();
  for (const c of conns) {
    if (c.role !== 'player' || !c.playerId) continue;
    const card = newCards.get(c.playerId);
    if (card) {
      await sendTo(endpoint, c.connectionId, { type: 'your_card', card });
    }
  }
}
```

- [ ] **Step 3: Wire dispatch in `handler.ts`**

```ts
import { handleStartCard } from './handlers/startCard';
case 'start_card': return handleStartCard(msg, connId, endpoint);
```

- [ ] **Step 4: Run + commit**

```
cd infra && npm test
git add infra/lambda/handlers/startCard.ts infra/lambda/handler.ts infra/lambda/__tests__/startCard.test.ts
git commit -m "Handler: start_card resets scores, regenerates cards, transitions to live"
```

---

### Task 12: `next_quote` handler

**Files:**
- Create: `infra/lambda/handlers/nextQuote.ts`
- Modify: `infra/lambda/handler.ts`
- Create: `infra/lambda/__tests__/nextQuote.test.ts`

- [ ] **Step 1: Failing test**

```ts
import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { handleNextQuote } from '../handlers/nextQuote';

const ddbMock = mockClient(DynamoDBDocumentClient);
const apiMock = mockClient(ApiGatewayManagementApiClient);
beforeEach(() => { ddbMock.reset(); apiMock.reset(); process.env.TABLE_NAME = 'T'; });

it('increments quote index, writes round, broadcasts quote', async () => {
  ddbMock.on(GetCommand)
    .resolvesOnce({ Item: { role: 'host' } })
    .resolves({ Item: { cardId: 'c', phase: 'live', currentQuoteIndex: 2 } });
  ddbMock.on(PutCommand).resolves({});
  ddbMock.on(QueryCommand).resolves({ Items: [{ connectionId: 'c1' }] });
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleNextQuote(
    { type: 'next_quote', quote: 'hello', possibleAnswers: ['A','B','C','D'] },
    'c1', 'https://x/prod',
  );

  const out = JSON.parse(apiMock.commandCalls(PostToConnectionCommand)[0].args[0].input.Data!.toString());
  expect(out.type).toBe('quote');
  expect(out.index).toBe(3);
});
```

- [ ] **Step 2: Implement `infra/lambda/handlers/nextQuote.ts`**

```ts
import { ClientMessage } from '../protocol';
import { getCardSession, writeCardSession, createQuoteRound } from '../state';
import { getConnection } from '../connections';
import { broadcastToAll, sendTo } from '../broadcast';

export async function handleNextQuote(
  msg: Extract<ClientMessage, { type: 'next_quote' }>,
  connectionId: string,
  endpoint: string,
): Promise<void> {
  const conn = await getConnection(connectionId);
  if (conn?.role !== 'host') {
    await sendTo(endpoint, connectionId, { type: 'error', reason: 'not_host' });
    return;
  }
  const session = await getCardSession();
  if (!session || session.phase !== 'live') {
    await sendTo(endpoint, connectionId, { type: 'error', reason: 'not_live' });
    return;
  }
  const index = session.currentQuoteIndex + 1;
  await createQuoteRound(session.cardId, index, msg.quote, msg.possibleAnswers);
  await writeCardSession({ ...session, currentQuoteIndex: index });
  await broadcastToAll(endpoint, {
    type: 'quote', index, quote: msg.quote, possibleAnswers: msg.possibleAnswers,
  });
}
```

- [ ] **Step 3: Wire dispatch + commit**

```ts
import { handleNextQuote } from './handlers/nextQuote';
case 'next_quote': return handleNextQuote(msg, connId, endpoint);
```

```
cd infra && npm test
git add infra/lambda/handlers/nextQuote.ts infra/lambda/handler.ts infra/lambda/__tests__/nextQuote.test.ts
git commit -m "Handler: next_quote writes round and broadcasts"
```

---

### Task 13: `guess` handler

**Files:**
- Create: `infra/lambda/handlers/guess.ts`
- Modify: `infra/lambda/handler.ts`
- Create: `infra/lambda/__tests__/guess.test.ts`

- [ ] **Step 1: Failing test**

```ts
import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { handleGuess } from '../handlers/guess';

const ddbMock = mockClient(DynamoDBDocumentClient);
const apiMock = mockClient(ApiGatewayManagementApiClient);
beforeEach(() => { ddbMock.reset(); apiMock.reset(); process.env.TABLE_NAME = 'T'; });

it('sends guess_ack on success', async () => {
  ddbMock.on(GetCommand).resolves({ Item: { role: 'player', playerId: 'p1', cardId: 'c1' } });
  ddbMock.on(UpdateCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});
  await handleGuess({ type: 'guess', quoteIndex: 3, guess: 'Andrew' }, 'c1', 'https://x/prod');
  const sent = JSON.parse(apiMock.commandCalls(PostToConnectionCommand)[0].args[0].input.Data!.toString());
  expect(sent.type).toBe('guess_ack');
});

it('sends guess_rejected too_late on conditional fail', async () => {
  ddbMock.on(GetCommand)
    .resolvesOnce({ Item: { role: 'player', playerId: 'p1', cardId: 'c1' } })
    .resolves({ Item: { revealed: true, quote: 'q', possibleAnswers: [], guesses: {} } });
  ddbMock.on(UpdateCommand).rejects(new ConditionalCheckFailedException({ message: '', $metadata: {} }));
  apiMock.on(PostToConnectionCommand).resolves({});
  await handleGuess({ type: 'guess', quoteIndex: 3, guess: 'Andrew' }, 'c1', 'https://x/prod');
  const sent = JSON.parse(apiMock.commandCalls(PostToConnectionCommand)[0].args[0].input.Data!.toString());
  expect(sent.type).toBe('guess_rejected');
  expect(sent.reason).toBe('too_late');
});
```

- [ ] **Step 2: Implement `infra/lambda/handlers/guess.ts`**

```ts
import { ClientMessage } from '../protocol';
import { recordGuess } from '../state';
import { getConnection } from '../connections';
import { sendTo } from '../broadcast';

export async function handleGuess(
  msg: Extract<ClientMessage, { type: 'guess' }>,
  connectionId: string,
  endpoint: string,
): Promise<void> {
  const conn = await getConnection(connectionId);
  if (conn?.role !== 'player' || !conn.playerId || !conn.cardId) {
    await sendTo(endpoint, connectionId, {
      type: 'guess_rejected', quoteIndex: msg.quoteIndex, reason: 'not_a_player',
    });
    return;
  }
  const outcome = await recordGuess(conn.cardId, msg.quoteIndex, conn.playerId, msg.guess);
  if (outcome === 'ok') {
    await sendTo(endpoint, connectionId, { type: 'guess_ack', quoteIndex: msg.quoteIndex, guess: msg.guess });
  } else {
    await sendTo(endpoint, connectionId, { type: 'guess_rejected', quoteIndex: msg.quoteIndex, reason: outcome });
  }
}
```

- [ ] **Step 3: Wire + commit**

```ts
import { handleGuess } from './handlers/guess';
case 'guess': return handleGuess(msg, connId, endpoint);
```

```
cd infra && npm test
git add infra/lambda/handlers/guess.ts infra/lambda/handler.ts infra/lambda/__tests__/guess.test.ts
git commit -m "Handler: guess with conditional too_late detection"
```

---

### Task 14: `reveal` handler

**Files:**
- Create: `infra/lambda/handlers/reveal.ts`
- Modify: `infra/lambda/handler.ts`
- Create: `infra/lambda/__tests__/reveal.test.ts`

- [ ] **Step 1: Failing test**

```ts
import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { handleReveal } from '../handlers/reveal';

const ddbMock = mockClient(DynamoDBDocumentClient);
const apiMock = mockClient(ApiGatewayManagementApiClient);
beforeEach(() => { ddbMock.reset(); apiMock.reset(); process.env.TABLE_NAME = 'T'; });

it('scores guesses and broadcasts reveal with leaderboard', async () => {
  ddbMock.on(GetCommand)
    .resolvesOnce({ Item: { role: 'host' } })
    .resolvesOnce({ Item: { cardId: 'c1', phase: 'live', currentQuoteIndex: 1 } })
    .resolvesOnce({ Item: { index: 1, quote: 'q', possibleAnswers: ['A','B'], truth: null, guesses: { p1: 'Andrew', p2: 'Tony' }, revealed: false } });
  ddbMock.on(QueryCommand).resolves({ Items: [
    { playerId: 'p1', name: 'P1', score: 0 },
    { playerId: 'p2', name: 'P2', score: 0 },
  ]});
  ddbMock.on(PutCommand).resolves({});
  ddbMock.on(UpdateCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleReveal({ type: 'reveal', truth: 'Andrew' }, 'c1', 'https://x/prod');

  const calls = apiMock.commandCalls(PostToConnectionCommand);
  const reveals = calls.filter(c => JSON.parse(c.args[0].input.Data!.toString()).type === 'reveal');
  expect(reveals.length).toBeGreaterThan(0);
  const payload = JSON.parse(reveals[0].args[0].input.Data!.toString());
  expect(payload.perPlayer.find((p: any) => p.playerId === 'p1').correct).toBe(true);
  expect(payload.perPlayer.find((p: any) => p.playerId === 'p2').correct).toBe(false);
  expect(payload.leaderboard.find((p: any) => p.playerId === 'p1').score).toBe(1);
});
```

- [ ] **Step 2: Implement `infra/lambda/handlers/reveal.ts`**

```ts
import { ClientMessage, LeaderboardEntry } from '../protocol';
import { getCardSession, getQuoteRound, markRevealed, listPlayers, putPlayer } from '../state';
import { getConnection } from '../connections';
import { broadcastToAll, sendTo } from '../broadcast';

export async function handleReveal(
  msg: Extract<ClientMessage, { type: 'reveal' }>,
  connectionId: string,
  endpoint: string,
): Promise<void> {
  const conn = await getConnection(connectionId);
  if (conn?.role !== 'host') {
    await sendTo(endpoint, connectionId, { type: 'error', reason: 'not_host' });
    return;
  }
  const session = await getCardSession();
  if (!session || session.phase !== 'live') return;
  const round = await getQuoteRound(session.cardId, session.currentQuoteIndex);
  if (!round || round.revealed) return;

  await markRevealed(session.cardId, round.index, msg.truth);

  const players = await listPlayers(session.cardId);
  const perPlayer = players.map(p => {
    const guess = round.guesses[p.playerId] ?? null;
    const correct = guess === msg.truth;
    return { playerId: p.playerId, name: p.name, guess, correct };
  });
  for (const p of players) {
    const result = perPlayer.find(x => x.playerId === p.playerId)!;
    if (result.correct) await putPlayer(session.cardId, { ...p, score: p.score + 1 });
  }
  const updated = await listPlayers(session.cardId);
  const leaderboard: LeaderboardEntry[] = updated
    .map(p => ({ playerId: p.playerId, name: p.name, score: p.score }))
    .sort((a, b) => b.score - a.score);

  await broadcastToAll(endpoint, {
    type: 'reveal', index: round.index, truth: msg.truth, perPlayer, leaderboard,
  });
}
```

- [ ] **Step 3: Wire + commit**

```ts
import { handleReveal } from './handlers/reveal';
case 'reveal': return handleReveal(msg, connId, endpoint);
```

```
cd infra && npm test
git add infra/lambda/handlers/reveal.ts infra/lambda/handler.ts infra/lambda/__tests__/reveal.test.ts
git commit -m "Handler: reveal scores guesses and broadcasts leaderboard update"
```

---

### Task 15: `end_game` handler

**Files:**
- Create: `infra/lambda/handlers/endGame.ts`
- Modify: `infra/lambda/handler.ts`
- Create: `infra/lambda/__tests__/endGame.test.ts`

- [ ] **Step 1: Failing test**

```ts
import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { handleEndGame } from '../handlers/endGame';

const ddbMock = mockClient(DynamoDBDocumentClient);
const apiMock = mockClient(ApiGatewayManagementApiClient);
beforeEach(() => { ddbMock.reset(); apiMock.reset(); process.env.TABLE_NAME = 'T'; });

it('resets phase to lobby and drops cards', async () => {
  ddbMock.on(GetCommand)
    .resolvesOnce({ Item: { role: 'host' } })
    .resolves({ Item: { cardId: 'c1', phase: 'live', currentQuoteIndex: 5 } });
  ddbMock.on(QueryCommand).resolves({ Items: [{ playerId: 'p1', name: 'A', score: 3, card: [['x']] }] });
  ddbMock.on(PutCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleEndGame('c1', 'https://x/prod');

  const writes = ddbMock.commandCalls(PutCommand);
  // CardSession write (phase=lobby) + Player write (card=null, score=0)
  const cardSessionWrite = writes.find(w => w.args[0].input.Item?.PK === 'CARD');
  expect(cardSessionWrite?.args[0].input.Item?.phase).toBe('lobby');
});
```

- [ ] **Step 2: Implement `infra/lambda/handlers/endGame.ts`**

```ts
import { getCardSession, writeCardSession, listPlayers, putPlayer } from '../state';
import { getConnection } from '../connections';
import { broadcastToAll, sendTo } from '../broadcast';
import { PlayerSummary } from '../protocol';

export async function handleEndGame(connectionId: string, endpoint: string): Promise<void> {
  const conn = await getConnection(connectionId);
  if (conn?.role !== 'host') {
    await sendTo(endpoint, connectionId, { type: 'error', reason: 'not_host' });
    return;
  }
  const session = await getCardSession();
  if (!session) return;

  await writeCardSession({ ...session, phase: 'lobby', currentQuoteIndex: 0, weights: undefined });

  const players = await listPlayers(session.cardId);
  for (const p of players) {
    await putPlayer(session.cardId, { ...p, card: null, score: 0 });
  }
  const summaries: PlayerSummary[] = players.map(p => ({ playerId: p.playerId, name: p.name }));
  await broadcastToAll(endpoint, { type: 'returned_to_lobby', players: summaries });
}
```

- [ ] **Step 3: Wire + commit**

```ts
import { handleEndGame } from './handlers/endGame';
case 'end_game': return handleEndGame(connId, endpoint);
```

```
cd infra && npm test
git add infra/lambda/handlers/endGame.ts infra/lambda/handler.ts infra/lambda/__tests__/endGame.test.ts
git commit -m "Handler: end_game returns session to lobby and drops cards"
```

---

## Phase 3 — Backend deploy & verify

### Task 16: Deploy and smoke-test with wscat

**Files:** none (manual)

- [ ] **Step 1: Build infra and deploy**

```
cd infra && npx cdk synth > /dev/null && npx cdk deploy --require-approval never
```

Expected: stack updates, outputs `WebSocketUrl: wss://...`. Note the URL.

- [ ] **Step 2: Install wscat globally if not present**

```
npm i -g wscat
```

- [ ] **Step 3: Smoke test as a host**

In terminal A, connect:

```
wscat -c wss://<your-url>
> {"body":{"type":"host_hello"}}
```

Expected: receive `{"type":"host_state","phase":"lobby","players":[],...}`.

- [ ] **Step 4: Smoke test as a player in terminal B**

```
wscat -c wss://<your-url>
> {"body":{"type":"join","name":"Andrew"}}
```

Expected: receive `joined` with new `playerId`, plus a `lobby_update` containing this player. Terminal A should also see `lobby_update`.

- [ ] **Step 5: Smoke test start_card**

From terminal A:

```
> {"body":{"type":"start_card","weights":[{"name":"Andrew","weight":1},{"name":"Tony","weight":1}]}}
```

Expected: both terminals receive `card_started`. Terminal B receives `your_card` with a 5×5 grid of names.

- [ ] **Step 6: Smoke test quote/guess/reveal cycle**

```
A> {"body":{"type":"next_quote","quote":"hello","possibleAnswers":["Andrew","Tony","Connor","Will"]}}
B> {"body":{"type":"guess","quoteIndex":1,"guess":"Andrew"}}
A> {"body":{"type":"reveal","truth":"Andrew"}}
```

Expected: B sees `quote`, then `guess_ack`, then `reveal` with `perPlayer[0].correct=true` and `leaderboard` showing score=1.

- [ ] **Step 7: Smoke test end_game**

```
A> {"body":{"type":"end_game"}}
```

Expected: both terminals receive `returned_to_lobby`.

- [ ] **Step 8: Commit deploy notes if any infra outputs changed**

If the WebSocket URL changed compared to what's in [src/app/app.component.ts:107](../../src/app/app.component.ts#L107), record the new URL — we'll plug it in at Task 27.

---

## Phase 4 — Frontend services

### Task 17: Frontend protocol types (mirror)

The Angular app uses TS 4.5 — separate `tsconfig` from infra. Mirror the type definitions rather than importing across the boundary.

**Files:**
- Create: `src/app/models/protocol.ts`

- [ ] **Step 1: Create `src/app/models/protocol.ts`**

Paste exactly the contents of `infra/lambda/protocol.ts` (the types and `isClientMessage` function). Same content, separate file.

- [ ] **Step 2: Confirm Angular still builds**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```
git add src/app/models/protocol.ts
git commit -m "Mirror protocol types for the Angular frontend"
```

---

### Task 18: Extract QuoteIngestService from AppComponent

**Files:**
- Create: `src/app/services/quote-ingest.service.ts`
- Create: `src/app/services/quote-ingest.service.spec.ts`

- [ ] **Step 1: Failing test `quote-ingest.service.spec.ts`**

```ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuoteIngestService } from './quote-ingest.service';

describe('QuoteIngestService', () => {
  let svc: QuoteIngestService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    svc = TestBed.inject(QuoteIngestService);
    http = TestBed.inject(HttpTestingController);
  });

  it('parses quotes and produces weights with collapsed nicknames', async () => {
    const promise = svc.load();
    const req = http.expectOne('assets/ingest_file.txt');
    req.flush(`"hi there" - Andrew\n"yo" - andrew (edited)\n"nope" - Con\n`);
    const result = await promise;
    expect(result.quotes.length).toBe(3);
    const andrew = result.weights.find(w => w.name === 'Andrew');
    expect(andrew?.weight).toBe(2);
    const connor = result.weights.find(w => w.name === 'Connor');
    expect(connor?.weight).toBe(1);
  });
});
```

- [ ] **Step 2: Implement `quote-ingest.service.ts`**

Move the `nickNameMap`, `regexData`, `generateStats`, `collapseStats`, `nickNameMapContainsString`, `getMasterNameFromNickName` logic out of `AppComponent`:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface IngestQuote { quote: string; rawName: string; canonicalName: string; }
export interface IngestResult { quotes: IngestQuote[]; weights: { name: string; weight: number }[]; }

@Injectable({ providedIn: 'root' })
export class QuoteIngestService {
  readonly nickNameMap: Record<string, string[]> = {
    'Connor': ['Con (edited)', 'Cumnor', 'Connor (edited)', 'Con', 'Connor'],
    'Andrew': ['Andrew', 'Andrew (Me) (edited)', 'Andrew (edited)', 'Andrew (me)', 'Golgari king', 'Steven + andrew and different points', 'Andrews', ' andrew', 'andrew', 'Steven + Andrew and Different Points (edited)'],
    'Shipley': ['Shipley to Steve', 'Ship (Text)', 'Shipley', 'Ship, inventor of rubber bands', 'Ship', 'Shiply', 'Shipley to steve', 'Shiply, probably', 'Ship (text)', 'shipley', 'Ship, Inventor of Rubber Bands', '- Ship', 'Ship (edited)'],
    'Tony': ['tony', 'Tony Rat (in response to a banned card) (edited)', 'Tony (edited)', 'Tony', 'Tony 2022', 'Tony rat (in response to a banned card)', '[tony]'],
    'Rumtin': ['Rumtin', 'Rumtin?!', 'Rumtin, in response to a date', 'Krockacondor', 'Rumtin (completely umprompted after the longest sweatest game)e'],
    'Matty': ['Matty?', 'Matty', 'Matty (edited)'],
    'Will': ['Will', 'Will (off books)'],
    'Doug': ['Doug', 'Doug (late night)'],
    'Stephen': ['Stephen', 'Steven + andrew and different points', 'Steven + Andrew and Different Points (edited)'],
    'Brandon': ['Brandon'], 'John': ['John'], 'David': ['David'], 'Daffy': ['Daffy'],
  };

  constructor(private http: HttpClient) {}

  async load(): Promise<IngestResult> {
    const text = await firstValueFrom(this.http.get('assets/ingest_file.txt', { responseType: 'text' }));
    return this.parse(text);
  }

  parse(text: string): IngestResult {
    const regex = /([“"][^"“”]+[”"])\s?-(.*)/g;
    const quotes: IngestQuote[] = [];
    const totals: Record<string, number> = {};
    for (const m of text.matchAll(regex)) {
      const rawName = m[2].trim();
      const canonical = this.canonicalize(rawName);
      if (!canonical) continue;
      quotes.push({ quote: m[1], rawName, canonicalName: canonical });
      totals[canonical] = (totals[canonical] ?? 0) + 1;
    }
    const weights = Object.entries(totals)
      .map(([name, weight]) => ({ name, weight }))
      .sort((a, b) => b.weight - a.weight);
    return { quotes, weights };
  }

  canonicalize(rawName: string): string | null {
    let name = rawName;
    if (name.endsWith('(edited)')) name = name.slice(0, -'(edited)'.length).trim();
    if (name.startsWith('- ')) name = name.slice(2);
    const lc = name.toLocaleLowerCase();
    for (const [canon, aliases] of Object.entries(this.nickNameMap)) {
      if (aliases.some(a => a.toLocaleLowerCase() === lc)) return canon;
    }
    return null;
  }
}
```

- [ ] **Step 3: Run tests — pass**

Run: `npm test -- --watch=false --include='**/quote-ingest.service.spec.ts'`
Expected: 1 test passes.

- [ ] **Step 4: Commit**

```
git add src/app/services/quote-ingest.service.ts src/app/services/quote-ingest.service.spec.ts
git commit -m "Extract QuoteIngestService with weighted-name parsing"
```

---

### Task 19: IdentityService

**Files:**
- Create: `src/app/services/identity.service.ts`
- Create: `src/app/services/identity.service.spec.ts`

- [ ] **Step 1: Failing test**

```ts
import { TestBed } from '@angular/core/testing';
import { IdentityService } from './identity.service';

describe('IdentityService', () => {
  beforeEach(() => { localStorage.clear(); TestBed.configureTestingModule({}); });

  it('returns null when nothing cached', () => {
    const svc = TestBed.inject(IdentityService);
    expect(svc.snapshot()).toBeNull();
  });

  it('persists and reloads identity', () => {
    const svc = TestBed.inject(IdentityService);
    svc.save({ playerId: 'p1', name: 'Andrew', cardId: 'c1' });
    const fresh = TestBed.inject(IdentityService);
    expect(fresh.snapshot()?.playerId).toBe('p1');
  });
});
```

- [ ] **Step 2: Implement `identity.service.ts`**

```ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Identity { playerId: string; name: string; cardId: string; }
const KEY = 'sussy-bingo:identity';

@Injectable({ providedIn: 'root' })
export class IdentityService {
  private subject: BehaviorSubject<Identity | null>;
  readonly identity$;

  constructor() {
    let initial: Identity | null = null;
    try { const raw = localStorage.getItem(KEY); if (raw) initial = JSON.parse(raw); } catch {}
    this.subject = new BehaviorSubject<Identity | null>(initial);
    this.identity$ = this.subject.asObservable();
  }

  snapshot(): Identity | null { return this.subject.value; }

  save(id: Identity): void {
    localStorage.setItem(KEY, JSON.stringify(id));
    this.subject.next(id);
  }

  clear(): void {
    localStorage.removeItem(KEY);
    this.subject.next(null);
  }
}
```

- [ ] **Step 3: Run + commit**

```
npm test -- --watch=false --include='**/identity.service.spec.ts'
git add src/app/services/identity.service.ts src/app/services/identity.service.spec.ts
git commit -m "Add IdentityService with localStorage persistence"
```

---

### Task 20: WebSocketService — reconnect, queue, onReconnect hook

**Files:**
- Modify: `src/app/services/web-socket.service.ts`
- Create: `src/app/services/web-socket.service.spec.ts`

- [ ] **Step 1: Failing test (use a fake WebSocket)**

```ts
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WebSocketService } from './web-socket.service';

class FakeSocket {
  static instances: FakeSocket[] = [];
  onopen?: () => void;
  onmessage?: (e: { data: string }) => void;
  onclose?: () => void;
  readyState = 0; // CONNECTING
  sent: string[] = [];
  constructor(public url: string) { FakeSocket.instances.push(this); }
  send(s: string) { this.sent.push(s); }
  close() { this.readyState = 3; this.onclose?.(); }
  open() { this.readyState = 1; this.onopen?.(); }
  message(obj: any) { this.onmessage?.({ data: JSON.stringify(obj) }); }
}

describe('WebSocketService', () => {
  let svc: WebSocketService;

  beforeEach(() => {
    FakeSocket.instances = [];
    (window as any).WebSocket = FakeSocket;
    TestBed.configureTestingModule({});
    svc = TestBed.inject(WebSocketService);
  });

  it('queues messages sent before connect, flushes on open', () => {
    svc.connect('wss://x');
    svc.send({ type: 'host_hello' });
    expect(FakeSocket.instances[0].sent.length).toBe(0);
    FakeSocket.instances[0].open();
    expect(FakeSocket.instances[0].sent.length).toBe(1);
    const payload = JSON.parse(FakeSocket.instances[0].sent[0]);
    expect(payload.body.type).toBe('host_hello');
  });

  it('reconnects on close and fires onReconnect hook', fakeAsync(() => {
    let reconnectCount = 0;
    svc.onReconnect = () => { reconnectCount++; };
    svc.connect('wss://x');
    FakeSocket.instances[0].open();
    FakeSocket.instances[0].close();
    tick(300);
    expect(FakeSocket.instances.length).toBe(2);
    FakeSocket.instances[1].open();
    expect(reconnectCount).toBe(1);
  }));
});
```

- [ ] **Step 2: Rewrite `web-socket.service.ts`**

```ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ClientMessage, ServerMessage } from '../models/protocol';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket?: WebSocket;
  private url: string = '';
  private subject = new Subject<ServerMessage>();
  private queue: ClientMessage[] = [];
  private retryMs = 250;
  private readonly retryMaxMs = 4000;
  private intentionallyClosed = false;
  onReconnect?: () => void;
  private isFirstConnect = true;

  connect(url: string): void {
    this.url = url;
    this.intentionallyClosed = false;
    this.open();
  }

  disconnect(): void {
    this.intentionallyClosed = true;
    this.socket?.close();
  }

  send(message: ClientMessage): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ body: message }));
    } else {
      this.queue.push(message);
    }
  }

  get messages$(): Observable<ServerMessage> {
    return this.subject.asObservable();
  }

  private open(): void {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = () => {
      this.retryMs = 250;
      const wasReconnect = !this.isFirstConnect;
      this.isFirstConnect = false;
      while (this.queue.length) {
        this.socket!.send(JSON.stringify({ body: this.queue.shift() }));
      }
      if (wasReconnect && this.onReconnect) this.onReconnect();
    };
    this.socket.onmessage = (e) => {
      try { this.subject.next(JSON.parse(e.data) as ServerMessage); } catch {}
    };
    this.socket.onclose = () => {
      if (this.intentionallyClosed) return;
      const delay = this.retryMs;
      this.retryMs = Math.min(this.retryMs * 2, this.retryMaxMs);
      setTimeout(() => this.open(), delay);
    };
    this.socket.onerror = () => { /* let onclose drive reconnect */ };
  }
}
```

Note: `Date.now()` is not used to drive retry timing — we use `setTimeout`. The test uses `fakeAsync` + `tick`, which works with that.

- [ ] **Step 3: Run tests — pass**

Run: `npm test -- --watch=false --include='**/web-socket.service.spec.ts'`

- [ ] **Step 4: Commit**

```
git add src/app/services/web-socket.service.ts src/app/services/web-socket.service.spec.ts
git commit -m "WebSocketService: reconnect with backoff, send queue, onReconnect hook"
```

---

### Task 21: GameStateService

Centralizes all client-side game state derived from server messages.

**Files:**
- Create: `src/app/services/game-state.service.ts`
- Create: `src/app/services/game-state.service.spec.ts`

- [ ] **Step 1: Failing test**

```ts
import { TestBed } from '@angular/core/testing';
import { GameStateService } from './game-state.service';

describe('GameStateService', () => {
  let svc: GameStateService;
  beforeEach(() => { TestBed.configureTestingModule({}); svc = TestBed.inject(GameStateService); });

  it('applies joined to populate identity-shaped state', () => {
    svc.apply({ type: 'joined', playerId: 'p1', cardId: 'c1', phase: 'lobby', name: 'A', score: 0,
      card: null, currentQuote: null, yourGuess: null, leaderboard: [], players: [{ playerId: 'p1', name: 'A' }] });
    const s = svc.snapshot();
    expect(s.phase).toBe('lobby');
    expect(s.me?.playerId).toBe('p1');
  });

  it('applies quote and clears yourGuess', () => {
    svc.apply({ type: 'joined', playerId: 'p1', cardId: 'c1', phase: 'live', name: 'A', score: 0,
      card: [['x']], currentQuote: null, yourGuess: 'OLD', leaderboard: [], players: [] });
    svc.apply({ type: 'quote', index: 5, quote: 'q', possibleAnswers: ['a','b'] });
    expect(svc.snapshot().currentQuote?.index).toBe(5);
    expect(svc.snapshot().yourGuess).toBeNull();
  });

  it('applies guess_ack to set yourGuess', () => {
    svc.apply({ type: 'quote', index: 5, quote: 'q', possibleAnswers: [] } as any);
    svc.apply({ type: 'guess_ack', quoteIndex: 5, guess: 'Andrew' });
    expect(svc.snapshot().yourGuess).toBe('Andrew');
  });

  it('applies reveal to set leaderboard and mark round revealed', () => {
    svc.apply({ type: 'reveal', index: 5, truth: 'Andrew',
      perPlayer: [{ playerId: 'p1', name: 'A', guess: 'Andrew', correct: true }],
      leaderboard: [{ playerId: 'p1', name: 'A', score: 1 }] });
    expect(svc.snapshot().leaderboard[0].score).toBe(1);
    expect(svc.snapshot().lastReveal?.truth).toBe('Andrew');
  });
});
```

- [ ] **Step 2: Implement `game-state.service.ts`**

```ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ServerMessage, LeaderboardEntry, PlayerSummary, Phase,
} from '../models/protocol';

export interface CurrentQuote { index: number; quote: string; possibleAnswers: string[]; }
export interface MyInfo { playerId: string; name: string; cardId: string; score: number; }
export interface LastReveal {
  index: number; truth: string;
  perPlayer: { playerId: string; name: string; guess: string | null; correct: boolean }[];
}

export interface GameState {
  phase: Phase | 'unknown';
  me: MyInfo | null;
  card: string[][] | null;
  players: PlayerSummary[];
  leaderboard: LeaderboardEntry[];
  currentQuote: CurrentQuote | null;
  yourGuess: string | null;
  lastReveal: LastReveal | null;
}

const initial: GameState = {
  phase: 'unknown', me: null, card: null, players: [], leaderboard: [],
  currentQuote: null, yourGuess: null, lastReveal: null,
};

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private subject = new BehaviorSubject<GameState>(initial);
  readonly state$ = this.subject.asObservable();

  snapshot(): GameState { return this.subject.value; }

  apply(msg: ServerMessage): void {
    const s = this.subject.value;
    switch (msg.type) {
      case 'joined':
        this.subject.next({
          ...s, phase: msg.phase,
          me: { playerId: msg.playerId, name: msg.name, cardId: msg.cardId, score: msg.score },
          card: msg.card, players: msg.players, leaderboard: msg.leaderboard,
          currentQuote: msg.currentQuote, yourGuess: msg.yourGuess, lastReveal: null,
        });
        return;
      case 'host_state':
        this.subject.next({
          ...s, phase: msg.phase, players: msg.players, leaderboard: msg.leaderboard,
          currentQuote: msg.currentQuote, yourGuess: null, lastReveal: null,
        });
        return;
      case 'lobby_update':
        this.subject.next({ ...s, players: msg.players });
        return;
      case 'card_started':
        this.subject.next({ ...s, phase: 'live', leaderboard: msg.leaderboard, currentQuote: null, yourGuess: null, lastReveal: null });
        return;
      case 'your_card':
        this.subject.next({ ...s, card: msg.card });
        return;
      case 'quote':
        this.subject.next({ ...s, currentQuote: { index: msg.index, quote: msg.quote, possibleAnswers: msg.possibleAnswers }, yourGuess: null, lastReveal: null });
        return;
      case 'guess_ack':
        if (s.currentQuote?.index === msg.quoteIndex) {
          this.subject.next({ ...s, yourGuess: msg.guess });
        }
        return;
      case 'guess_rejected':
        // Surface to UI via a separate observable later if needed; for now just clear yourGuess.
        if (s.currentQuote?.index === msg.quoteIndex) {
          this.subject.next({ ...s, yourGuess: null });
        }
        return;
      case 'reveal':
        this.subject.next({
          ...s,
          leaderboard: msg.leaderboard,
          lastReveal: { index: msg.index, truth: msg.truth, perPlayer: msg.perPlayer },
          me: s.me ? { ...s.me, score: msg.leaderboard.find(l => l.playerId === s.me!.playerId)?.score ?? s.me.score } : s.me,
        });
        return;
      case 'returned_to_lobby':
        this.subject.next({ ...s, phase: 'lobby', card: null, currentQuote: null, yourGuess: null, lastReveal: null, players: msg.players, leaderboard: [] });
        return;
      case 'error':
        console.error('server error', msg.reason);
        return;
    }
  }
}
```

- [ ] **Step 3: Run + commit**

```
npm test -- --watch=false --include='**/game-state.service.spec.ts'
git add src/app/services/game-state.service.ts src/app/services/game-state.service.spec.ts
git commit -m "Add GameStateService as client-side state reducer"
```

---

## Phase 5 — Frontend routing & components

### Task 22: Routing + LandingComponent

**Files:**
- Create: `src/app/pages/landing/landing.component.ts`
- Create: `src/app/pages/landing/landing.component.html`
- Create: `src/app/pages/landing/landing.component.scss`
- Modify: `src/app/app-routing.module.ts`
- Modify: `src/app/app.module.ts`

- [ ] **Step 1: `landing.component.ts`**

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {}
```

- [ ] **Step 2: `landing.component.html`**

```html
<div class="landing">
  <h1>Sussy Bingo</h1>
  <nav>
    <a routerLink="/play" class="big-btn">Join the Game</a>
    <a routerLink="/host" class="big-btn">Host on this TV</a>
    <a routerLink="/cloud" class="text-link">Word Cloud</a>
  </nav>
</div>
```

- [ ] **Step 3: `landing.component.scss`**

```scss
.landing { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; padding: 3rem; }
.big-btn { display: block; padding: 1rem 2rem; font-size: 1.5rem; border: 2px solid #333; border-radius: 8px; }
.text-link { color: #555; }
```

- [ ] **Step 4: Update `src/app/app-routing.module.ts`**

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { PlayerComponent } from './pages/player/player.component';
import { HostComponent } from './pages/host/host.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingComponent },
  { path: 'play', component: PlayerComponent },
  { path: 'host', component: HostComponent },
  { path: 'cloud', component: AppComponent }, // legacy word-cloud entry
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

PlayerComponent / HostComponent files don't exist yet — Task 23 and Task 25 add them. To keep the build green between tasks, also create empty shell files now:

```ts
// src/app/pages/player/player.component.ts
import { Component } from '@angular/core';
@Component({ selector: 'app-player', template: '<p>Player (stub)</p>' })
export class PlayerComponent {}
```

```ts
// src/app/pages/host/host.component.ts
import { Component } from '@angular/core';
@Component({ selector: 'app-host', template: '<p>Host (stub)</p>' })
export class HostComponent {}
```

- [ ] **Step 5: Register components in `src/app/app.module.ts`**

Add to `declarations` array:

```ts
LandingComponent,
PlayerComponent,
HostComponent,
```

Add the matching imports at the top of the file.

- [ ] **Step 6: Run `npm run build`**

Expected: build succeeds.

- [ ] **Step 7: Commit**

```
git add src/app/pages src/app/app-routing.module.ts src/app/app.module.ts
git commit -m "Add routing for /, /play, /host with landing and stub components"
```

---

### Task 23: PlayerComponent — name entry + lobby waiting view

**Files:**
- Modify: `src/app/pages/player/player.component.ts`
- Create: `src/app/pages/player/player.component.html`
- Create: `src/app/pages/player/player.component.scss`

- [ ] **Step 1: Replace `player.component.ts`**

```ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IdentityService } from '../../services/identity.service';
import { WebSocketService } from '../../services/web-socket.service';
import { GameStateService, GameState } from '../../services/game-state.service';
import { WS_URL } from '../../config';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  state: GameState;
  needsName = false;
  nameInput = '';
  private sub?: Subscription;

  constructor(
    private ws: WebSocketService,
    private identity: IdentityService,
    public game: GameStateService,
  ) { this.state = game.snapshot(); }

  ngOnInit(): void {
    this.ws.connect(WS_URL);
    this.ws.onReconnect = () => this.rejoin();
    this.sub = this.ws.messages$.subscribe(msg => this.game.apply(msg));
    const cached = this.identity.snapshot();
    if (cached) {
      this.ws.send({ type: 'join', name: cached.name, playerId: cached.playerId });
    } else {
      this.needsName = true;
    }
    this.game.state$.subscribe(s => {
      this.state = s;
      if (s.me && !this.identity.snapshot()) {
        this.identity.save({ playerId: s.me.playerId, name: s.me.name, cardId: s.me.cardId });
      } else if (s.me && this.identity.snapshot()?.cardId !== s.me.cardId) {
        this.identity.save({ playerId: s.me.playerId, name: s.me.name, cardId: s.me.cardId });
      }
    });
  }

  submitName(): void {
    if (!this.nameInput.trim()) return;
    this.ws.send({ type: 'join', name: this.nameInput.trim() });
    this.needsName = false;
  }

  onSquareTap(name: string): void {
    if (!this.state.currentQuote) return;
    this.ws.send({ type: 'guess', quoteIndex: this.state.currentQuote.index, guess: name });
  }

  private rejoin(): void {
    const cached = this.identity.snapshot();
    if (cached) this.ws.send({ type: 'join', name: cached.name, playerId: cached.playerId });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
```

- [ ] **Step 2: Create `src/app/config.ts`** (constants needed by PlayerComponent and later HostComponent):

```ts
export const WS_URL = 'wss://xybej7pfk0.execute-api.us-east-1.amazonaws.com/production';
```

(Update at Task 27 if the deploy produced a new URL.)

- [ ] **Step 3: `player.component.html`**

```html
<div class="player">
  <ng-container *ngIf="needsName">
    <h2>What's your name?</h2>
    <input [(ngModel)]="nameInput" (keyup.enter)="submitName()" placeholder="Your name" />
    <button (click)="submitName()" [disabled]="!nameInput.trim()">Join</button>
  </ng-container>

  <ng-container *ngIf="!needsName && state.phase === 'lobby'">
    <h2>Waiting for the host to start…</h2>
    <p>You're in as <strong>{{ state.me?.name }}</strong>.</p>
    <h3>Players here:</h3>
    <ul><li *ngFor="let p of state.players">{{ p.name }}</li></ul>
  </ng-container>

  <ng-container *ngIf="!needsName && state.phase === 'live' && state.card">
    <div class="quote-area" *ngIf="state.currentQuote">
      <h3>Quote #{{ state.currentQuote.index }}</h3>
      <blockquote>{{ state.currentQuote.quote }}</blockquote>
      <p>Possible: {{ state.currentQuote.possibleAnswers.join(', ') }}</p>
      <p *ngIf="state.yourGuess">You guessed: <strong>{{ state.yourGuess }}</strong></p>
    </div>

    <div class="card-grid">
      <div class="row" *ngFor="let row of state.card">
        <button class="cell"
                *ngFor="let name of row"
                [class.you-guessed]="state.yourGuess === name && !state.lastReveal"
                [class.correct]="state.lastReveal?.truth === name && state.yourGuess === name"
                [class.incorrect]="state.lastReveal && state.yourGuess === name && state.lastReveal.truth !== name"
                (click)="onSquareTap(name)">
          {{ name }}
        </button>
      </div>
    </div>

    <div *ngIf="state.lastReveal" class="reveal-banner">
      Truth: <strong>{{ state.lastReveal.truth }}</strong>
    </div>
    <div class="score">Score: {{ state.me?.score }}</div>
  </ng-container>
</div>
```

- [ ] **Step 4: `player.component.scss`**

```scss
.player { padding: 1rem; max-width: 480px; margin: 0 auto; font-family: sans-serif; }
.card-grid { display: flex; flex-direction: column; gap: 4px; margin-top: 1rem; }
.row { display: flex; gap: 4px; }
.cell { flex: 1; aspect-ratio: 1; font-size: 0.9rem; border: 1px solid #888; background: #fafafa; cursor: pointer; }
.cell.you-guessed { background: #ffeaa7; }
.cell.correct { background: #b8e994; }
.cell.incorrect { background: #f8c8c8; }
.quote-area { background: #f5f5f5; padding: 0.75rem; border-radius: 6px; }
blockquote { font-size: 1.1rem; font-style: italic; }
.reveal-banner { margin-top: 1rem; padding: 0.5rem; background: #dfe6e9; }
.score { margin-top: 0.5rem; font-weight: bold; }
```

- [ ] **Step 5: Ensure `FormsModule` is in `app.module.ts` imports** (for `[(ngModel)]`). It likely already is — verify by reading `app.module.ts` and adding if missing.

- [ ] **Step 6: Run `npm run build` and commit**

```
git add src/app/pages/player src/app/config.ts src/app/app.module.ts
git commit -m "PlayerComponent: name entry, lobby waiting, card+quote+guess, reveal feedback"
```

---

### Task 24: HostComponent — lobby, live view, leaderboard, controls

**Files:**
- Modify: `src/app/pages/host/host.component.ts`
- Create: `src/app/pages/host/host.component.html`
- Create: `src/app/pages/host/host.component.scss`

- [ ] **Step 1: Replace `host.component.ts`**

```ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/web-socket.service';
import { GameStateService, GameState } from '../../services/game-state.service';
import { QuoteIngestService, IngestQuote } from '../../services/quote-ingest.service';
import { WS_URL } from '../../config';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss'],
})
export class HostComponent implements OnInit, OnDestroy {
  state: GameState;
  private quotes: IngestQuote[] = [];
  private quotesUsed = new Set<number>();
  private weights: { name: string; weight: number }[] = [];
  private nameRoster: string[] = [];
  private currentTruth: string | null = null;
  private sub?: Subscription;
  ingestReady = false;

  constructor(
    private ws: WebSocketService,
    public game: GameStateService,
    private ingest: QuoteIngestService,
  ) { this.state = game.snapshot(); }

  async ngOnInit(): Promise<void> {
    const result = await this.ingest.load();
    this.quotes = result.quotes;
    this.weights = result.weights;
    this.nameRoster = result.weights.map(w => w.name);
    this.ingestReady = true;

    this.ws.connect(WS_URL);
    this.ws.onReconnect = () => this.ws.send({ type: 'host_hello' });
    this.sub = this.ws.messages$.subscribe(msg => this.game.apply(msg));
    this.game.state$.subscribe(s => this.state = s);
    this.ws.send({ type: 'host_hello' });
  }

  startCard(): void {
    this.quotesUsed.clear();
    this.currentTruth = null;
    this.ws.send({ type: 'start_card', weights: this.weights });
  }

  newCard(): void { this.startCard(); }

  nextQuote(): void {
    const pick = this.pickUnusedQuote();
    if (!pick) return;
    this.currentTruth = pick.canonicalName;
    const answers = this.buildAnswers(pick.canonicalName);
    this.ws.send({ type: 'next_quote', quote: pick.quote, possibleAnswers: answers });
  }

  reveal(): void {
    if (!this.currentTruth) return;
    this.ws.send({ type: 'reveal', truth: this.currentTruth });
    this.currentTruth = null;
  }

  endGame(): void { this.ws.send({ type: 'end_game' }); }

  private pickUnusedQuote(): IngestQuote | null {
    const remaining = this.quotes.filter((_, i) => !this.quotesUsed.has(i));
    if (!remaining.length) return null;
    const idx = Math.floor(Math.random() * remaining.length);
    const original = this.quotes.indexOf(remaining[idx]);
    this.quotesUsed.add(original);
    return remaining[idx];
  }

  private buildAnswers(truth: string): string[] {
    const pool = this.nameRoster.filter(n => n !== truth);
    const decoys: string[] = [];
    while (decoys.length < 3 && pool.length) {
      const i = Math.floor(Math.random() * pool.length);
      decoys.push(pool.splice(i, 1)[0]);
    }
    return [truth, ...decoys].sort(() => Math.random() - 0.5);
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
```

- [ ] **Step 2: `host.component.html`**

```html
<div class="host">
  <header>
    <h1>Sussy Bingo — Host</h1>
    <div class="phase-pill">{{ state.phase }}</div>
  </header>

  <main *ngIf="ingestReady; else loading">
    <section class="left">
      <ng-container *ngIf="state.phase === 'lobby'">
        <h2>Players ({{ state.players.length }})</h2>
        <ul class="player-tiles">
          <li *ngFor="let p of state.players">{{ p.name }}</li>
          <li *ngIf="!state.players.length" class="placeholder">Waiting for players to join…</li>
        </ul>
        <button class="primary" (click)="startCard()" [disabled]="!state.players.length">Start Game</button>
      </ng-container>

      <ng-container *ngIf="state.phase === 'live'">
        <ng-container *ngIf="state.currentQuote; else noQuote">
          <h2>Quote #{{ state.currentQuote.index }}</h2>
          <blockquote class="big">{{ state.currentQuote.quote }}</blockquote>
          <ul class="possible-answers">
            <li *ngFor="let a of state.currentQuote.possibleAnswers">{{ a }}</li>
          </ul>
          <div *ngIf="state.lastReveal && state.lastReveal.index === state.currentQuote.index" class="truth-banner">
            Truth: <strong>{{ state.lastReveal.truth }}</strong>
          </div>
        </ng-container>
        <ng-template #noQuote>
          <p class="hint">Click "Next Quote" to begin.</p>
        </ng-template>

        <div class="controls">
          <button class="primary" (click)="nextQuote()">Next Quote</button>
          <button class="primary" (click)="reveal()">Reveal</button>
          <button (click)="newCard()">New Card</button>
          <button class="danger" (click)="endGame()">End Game</button>
        </div>
      </ng-container>
    </section>

    <aside class="leaderboard">
      <h3>Leaderboard</h3>
      <ol>
        <li *ngFor="let row of state.leaderboard">
          <span class="name">{{ row.name }}</span>
          <span class="score">{{ row.score }}</span>
        </li>
        <li *ngIf="!state.leaderboard.length" class="placeholder">No scores yet</li>
      </ol>
    </aside>
  </main>

  <ng-template #loading><p>Loading quote pool…</p></ng-template>
</div>
```

- [ ] **Step 3: `host.component.scss`**

```scss
.host { font-family: sans-serif; padding: 1rem 2rem; min-height: 100vh; background: #fafafa; }
header { display: flex; align-items: baseline; justify-content: space-between; }
.phase-pill { padding: 0.25rem 0.75rem; background: #ddd; border-radius: 999px; text-transform: uppercase; font-size: 0.8rem; }
main { display: grid; grid-template-columns: 3fr 1fr; gap: 2rem; margin-top: 1.5rem; }
.player-tiles { display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; list-style: none; }
.player-tiles li { padding: 0.75rem 1.25rem; background: #fff; border: 1px solid #ddd; border-radius: 8px; font-size: 1.25rem; }
.placeholder { color: #888; font-style: italic; }
button { padding: 0.75rem 1.25rem; font-size: 1rem; cursor: pointer; }
button.primary { background: #2d3436; color: white; border: none; border-radius: 6px; }
button.danger { background: #d63031; color: white; border: none; border-radius: 6px; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
.controls { display: flex; gap: 0.5rem; margin-top: 1.5rem; }
.big { font-size: 2rem; line-height: 1.3; font-style: italic; }
.possible-answers { display: flex; gap: 1rem; padding: 0; list-style: none; font-size: 1.4rem; }
.truth-banner { margin-top: 1rem; padding: 0.5rem 1rem; background: #b8e994; border-radius: 6px; font-size: 1.25rem; }
.leaderboard ol { list-style: none; padding: 0; }
.leaderboard li { display: flex; justify-content: space-between; padding: 0.4rem 0.5rem; border-bottom: 1px solid #eee; }
.leaderboard .score { font-weight: bold; }
```

- [ ] **Step 4: Build and commit**

```
npm run build
git add src/app/pages/host
git commit -m "HostComponent: lobby tiles, live view, leaderboard, full game controls"
```

---

### Task 25: Slim AppComponent — keep only the word-cloud view

**Files:**
- Modify: `src/app/app.component.ts`
- Modify: `src/app/app.component.html`
- Modify: `src/app/app.component.scss`

The router now sends `/cloud` → `AppComponent`. AppComponent becomes a thin word-cloud page (its existing `loseMyselfInTheCloud` logic). All bingo state, WebSocket logic, and stats lists are deleted.

- [ ] **Step 1: Replace `app.component.ts`**

```ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('wordCloud') wordCloud?: WordCloudComponent;
  private readonly noNoWords = new Set([
    'i','im','to','you','the','my','a','this','just','that','is','of','in','and','it','on','have','going','dont','its',
  ]);

  async ngOnInit(): Promise<void> {
    const text = await firstValueFrom(this.http.get('assets/ingest_file.txt', { responseType: 'text' }));
    const counts: Record<string, number> = {};
    for (const match of text.matchAll(/([“"][^"“”]+[”"])/g)) {
      for (const word of match[1].split(' ')
        .map(w => w.toLocaleLowerCase().replace(/["',-]/g, ''))
        .filter(w => w && !this.noNoWords.has(w))) {
        counts[word] = (counts[word] ?? 0) + 1;
      }
    }
    const data = Object.entries(counts).filter(([, n]) => n > 1).map(([text, n]) => ({ text, value: n * 10 }));
    if (this.wordCloud) this.wordCloud.data = data;
  }

  constructor(private http: HttpClient) {}
}
```

- [ ] **Step 2: Replace `app.component.html`**

```html
<div class="page-container">
  <app-word-cloud #wordCloud></app-word-cloud>
  <a routerLink="/" class="back">Back to Home</a>
</div>
```

- [ ] **Step 3: Trim `app.component.scss`** to just what the cloud page needs. Replace contents with minimal layout styles for `.page-container` and `.back` (keep whatever currently styles the word cloud working).

- [ ] **Step 4: Verify `AppRoutingModule` matches — `/cloud` → `AppComponent`. Already wired in Task 22.

- [ ] **Step 5: Run `npm test -- --watch=false`**

If any existing AppComponent spec breaks because the public surface changed, delete those tests (the behavior they covered now lives in services that have their own specs).

- [ ] **Step 6: Run `npm run build`**

Expected: build succeeds with no warnings about unused types.

- [ ] **Step 7: Commit**

```
git add src/app/app.component.ts src/app/app.component.html src/app/app.component.scss
git commit -m "Slim AppComponent to the word-cloud page; all bingo logic now lives in components/services"
```

---

### Task 26: Wire correct WebSocket URL after deploy

**Files:**
- Modify: `src/app/config.ts`

- [ ] **Step 1: Confirm the URL from Task 16 deploy output**

If the existing `WS_URL` matches the deployed stage URL, no change. Otherwise update:

```ts
export const WS_URL = 'wss://<new-id>.execute-api.us-east-1.amazonaws.com/production';
```

- [ ] **Step 2: Build and commit**

```
npm run build
git add src/app/config.ts
git commit -m "Point WS_URL at deployed WebSocket stage"
```

---

## Phase 6 — End-to-end smoke test

### Task 27: Manual smoke test checklist

**Files:** none

- [ ] **Step 1: Start dev server**

```
npm start
```

Open three browser windows: one on `/host`, two on `/play` (use different profiles or incognito).

- [ ] **Step 2: Lobby flow**

- On `/host`, you should see "Waiting for players to join…"
- Enter different names on the two `/play` windows. Each name should appear as a tile on the host immediately.
- Refresh one player window — the player auto-rejoins (no name prompt) and the tile stays.

- [ ] **Step 3: Start game**

- Click "Start Game" on the host. Both player windows swap to bingo cards.
- Each card is 5×5 names.

- [ ] **Step 4: Quote / guess / reveal**

- Click "Next Quote" on host. Players see the quote and the 4 possible answers.
- Tap a square in each player window — verify the cell highlights yellow ("you-guessed").
- Click "Reveal" on host. Correct guesses turn green; incorrect turn red. Leaderboard updates on the host.

- [ ] **Step 5: Refresh resiliency**

- During an active round (after `Next Quote`, before `Reveal`): refresh a player window. It should land back on the bingo card with the same quote shown and any already-submitted guess restored.
- Refresh the host window. It should land back on the live view with the current quote and leaderboard intact.

- [ ] **Step 6: New card / end game**

- Click "New Card" on host. Players' cards regenerate; scores reset to 0.
- Click "End Game". Players return to "Waiting for the host to start…".

- [ ] **Step 7: Bump version and commit notes**

```
npm version patch --no-git-tag-version
git add package.json
git commit -m "Cut version for server-authoritative bingo rebuild"
```

If anything in the checklist failed, capture it as a follow-up task before declaring the plan complete.

---

## Spec coverage matrix

| Spec requirement | Task(s) |
|---|---|
| Single DynamoDB table with PK/SK | Task 3 |
| `CARD/CURRENT` session item, TTL'd | Tasks 3, 4 |
| Player rows with card + score | Task 5 |
| Quote round rows with guesses + revealed | Task 6 |
| Connection rows with role/playerId | Task 7 |
| Lobby phase + start_card transition | Tasks 4, 11 |
| Server-judged scoring on reveal | Task 14 |
| End Game → lobby | Task 15 |
| join / rejoin via cached playerId | Tasks 9, 19, 23 |
| host_hello rehydration | Tasks 10, 24 |
| lobby_update broadcast | Tasks 9, 15 |
| Conditional too_late guess detection | Tasks 6, 13 |
| GoneException cleanup on broadcast | Task 8 |
| WebSocketService backoff reconnect | Task 20 |
| Identity in localStorage | Task 19 |
| GameStateService as reducer | Task 21 |
| Frontend route split | Task 22 |
| PlayerComponent (lobby + live + reveal feedback) | Task 23 |
| HostComponent (lobby + leaderboard + controls) | Task 24 |
| Slim AppComponent to word-cloud only | Task 25 |
| End-to-end smoke test | Task 27 |
