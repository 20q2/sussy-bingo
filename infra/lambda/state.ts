import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';
import { CARD_PK, CARD_CURRENT_SK, ttl, cardScopedPK, playerSK } from './keys';
import { Phase, NameWeight } from './protocol';

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
