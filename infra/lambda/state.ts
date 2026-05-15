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
