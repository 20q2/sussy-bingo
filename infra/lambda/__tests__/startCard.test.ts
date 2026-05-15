import { beforeEach, it, expect } from 'vitest';
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
