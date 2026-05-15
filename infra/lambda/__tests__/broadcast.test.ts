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
