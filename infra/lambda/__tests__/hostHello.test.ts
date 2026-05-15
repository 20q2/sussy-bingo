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

it('includes tokenId in each PlayerSummary entry in host_state', async () => {
  ddbMock.on(GetCommand).resolves({ Item: undefined });
  ddbMock.on(PutCommand).resolves({});
  ddbMock.on(QueryCommand).resolves({
    Items: [
      { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: 'token-abc' },
      { playerId: 'p2', name: 'Bob', score: 2, card: null, tokenId: null },
    ],
  });
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleHostHello('c1', 'https://x/prod');

  const sent = JSON.parse(apiMock.commandCalls(PostToConnectionCommand)[0].args[0].input.Data!.toString());
  expect(sent.type).toBe('host_state');
  expect(sent.players).toHaveLength(2);
  expect(sent.players[0]).toHaveProperty('tokenId', 'token-abc');
  expect(sent.players[1]).toHaveProperty('tokenId', null);
});
