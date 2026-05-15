import { DeleteCommand, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
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
