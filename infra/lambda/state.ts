import { DynamoDBClient, ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, DeleteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';
import { CARD_PK, CARD_CURRENT_SK, ttl, cardScopedPK, playerSK, quoteSK } from './keys';
import { Phase, NameWeight } from './protocol';

const TABLE = () => process.env.TABLE_NAME!;
export const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export interface CardSession {
  cardId: string;
  phase: Phase;
  currentQuoteIndex: number;
  weights?: { name: string; weight: number }[];
  card?: string[][];
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
    card: res.Item.card,
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

export async function deletePlayer(cardId: string, playerId: string): Promise<void> {
  await ddb.send(new DeleteCommand({
    TableName: TABLE(),
    Key: { PK: cardScopedPK(cardId), SK: playerSK(playerId) },
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

  // Center bias: rare names (low quote count) get a multiplier boost as cells
  // get closer to the middle of the board. Picking a center cell becomes a
  // "go out on a limb" play — the name there is statistically unlikely to
  // be the speaker, but locking it pays off harder.
  const maxW = Math.max(...weights.map(w => w.weight));
  const minW = Math.min(...weights.map(w => w.weight));
  const weightSpan = Math.max(maxW - minW, 1);
  const cw = (width - 1) / 2;
  const ch = (height - 1) / 2;
  const maxRing = Math.max(cw, ch) || 1;
  const RARITY_BOOST = 3; // up to 4x weight for the rarest name at the dead center

  const pickAt = (row: number, col: number): string => {
    // Chebyshev distance → 0 at center, maxRing at the corners
    const d = Math.max(Math.abs(row - ch), Math.abs(col - cw));
    const proximity = 1 - d / maxRing; // 1 at center, 0 at outer ring
    let adjTotal = 0;
    const adjusted = weights.map(({ name, weight }) => {
      const rarity = 1 - (weight - minW) / weightSpan; // 1 for rarest, 0 for most common
      const adj = weight * (1 + RARITY_BOOST * proximity * rarity);
      adjTotal += adj;
      return { name, weight: adj };
    });
    let roll = rand() * adjTotal;
    for (const { name, weight } of adjusted) {
      roll -= weight;
      if (roll <= 0) return name;
    }
    return adjusted[adjusted.length - 1].name;
  };
  const grid: string[][] = [];
  for (let r = 0; r < height; r++) {
    const row: string[] = [];
    for (let c = 0; c < width; c++) row.push(pickAt(r, c));
    grid.push(row);
  }

  const present = new Set(grid.flat());
  const missing = weights.filter(w => w.weight > 0 && !present.has(w.name)).map(w => w.name);
  for (const name of missing) {
    const counts: Record<string, number> = {};
    for (const n of grid.flat()) counts[n] = (counts[n] ?? 0) + 1;
    const candidates: [number, number][] = [];
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        if (counts[grid[r][c]] > 1) candidates.push([r, c]);
      }
    }
    if (candidates.length === 0) break;
    const [r, c] = candidates[Math.floor(rand() * candidates.length)];
    grid[r][c] = name;
  }

  return grid;
}

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
