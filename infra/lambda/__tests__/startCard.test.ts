import { beforeEach, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { handleStartCard } from '../handlers/startCard';
import tokensJson from '../tokens.json';

const ALL_TOKEN_IDS = (tokensJson as Array<{ id: string }>).map(t => t.id);

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
  // QueryCommand is shared by listPlayers and listAllConnections.
  // Items include both player fields (playerId/name/score) and connection fields
  // (connectionId/role) so both functions get usable data from the same mock response.
  ddbMock.on(QueryCommand).resolves({ Items: [
    { connectionId: 'c-p1', role: 'player', playerId: 'p1', name: 'A', score: 0, card: null },
    { connectionId: 'c-p2', role: 'player', playerId: 'p2', name: 'B', score: 0, card: null },
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

it('tokens: assigns random unused tokens to players with null tokenId before broadcasting', async () => {
  const tokenA = ALL_TOKEN_IDS[0]; // already taken by p1
  const tokenB = ALL_TOKEN_IDS[1]; // already taken by p2

  ddbMock.on(GetCommand)
    .resolvesOnce({ Item: { role: 'host', cardId: 'card1' } }) // connection lookup
    .resolves({ Item: { PK: 'CARD', SK: 'CURRENT', cardId: 'card1', phase: 'lobby', currentQuoteIndex: 0 } });
  ddbMock.on(QueryCommand).resolves({ Items: [
    { connectionId: 'c-p1', role: 'player', playerId: 'p1', name: 'A', score: 0, card: null, tokenId: tokenA },
    { connectionId: 'c-p2', role: 'player', playerId: 'p2', name: 'B', score: 0, card: null, tokenId: tokenB },
    { connectionId: 'c-p3', role: 'player', playerId: 'p3', name: 'C', score: 0, card: null, tokenId: null },
  ]});
  ddbMock.on(PutCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleStartCard(
    { type: 'start_card', weights: [{ name: 'A', weight: 1 }] },
    'c1', 'https://x/prod',
  );

  const putCalls = ddbMock.commandCalls(PutCommand)
    .filter(c => (c.args[0].input.Item?.SK as string | undefined)?.startsWith('PLAYER#'));
  // Three putPlayer calls (one per player)
  expect(putCalls.length).toBe(3);

  const items = putCalls.map(c => c.args[0].input.Item as Record<string, unknown>);
  const p1Item = items.find(i => i.playerId === 'p1')!;
  const p2Item = items.find(i => i.playerId === 'p2')!;
  const p3Item = items.find(i => i.playerId === 'p3')!;

  // p1 and p2 preserve their tokenIds
  expect(p1Item.tokenId).toBe(tokenA);
  expect(p2Item.tokenId).toBe(tokenB);

  // p3 gets a token that is non-null, in the pool, and not one already taken
  expect(p3Item.tokenId).not.toBeNull();
  expect(ALL_TOKEN_IDS).toContain(p3Item.tokenId);
  expect(p3Item.tokenId).not.toBe(tokenA);
  expect(p3Item.tokenId).not.toBe(tokenB);
});

it('tokens: leaves all-already-picked rosters unchanged', async () => {
  const tokenA = ALL_TOKEN_IDS[0];
  const tokenB = ALL_TOKEN_IDS[1];
  const tokenC = ALL_TOKEN_IDS[2];

  ddbMock.on(GetCommand)
    .resolvesOnce({ Item: { role: 'host', cardId: 'card1' } })
    .resolves({ Item: { PK: 'CARD', SK: 'CURRENT', cardId: 'card1', phase: 'lobby', currentQuoteIndex: 0 } });
  ddbMock.on(QueryCommand).resolves({ Items: [
    { connectionId: 'c-p1', role: 'player', playerId: 'p1', name: 'A', score: 0, card: null, tokenId: tokenA },
    { connectionId: 'c-p2', role: 'player', playerId: 'p2', name: 'B', score: 0, card: null, tokenId: tokenB },
    { connectionId: 'c-p3', role: 'player', playerId: 'p3', name: 'C', score: 0, card: null, tokenId: tokenC },
  ]});
  ddbMock.on(PutCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleStartCard(
    { type: 'start_card', weights: [{ name: 'A', weight: 1 }] },
    'c1', 'https://x/prod',
  );

  const putCalls = ddbMock.commandCalls(PutCommand)
    .filter(c => (c.args[0].input.Item?.SK as string | undefined)?.startsWith('PLAYER#'));
  expect(putCalls.length).toBe(3);

  const items = putCalls.map(c => c.args[0].input.Item as Record<string, unknown>);
  const p1Item = items.find(i => i.playerId === 'p1')!;
  const p2Item = items.find(i => i.playerId === 'p2')!;
  const p3Item = items.find(i => i.playerId === 'p3')!;

  expect(p1Item.tokenId).toBe(tokenA);
  expect(p2Item.tokenId).toBe(tokenB);
  expect(p3Item.tokenId).toBe(tokenC);
});
