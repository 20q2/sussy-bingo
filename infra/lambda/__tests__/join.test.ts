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

it('includes tokenId: null in PlayerSummary for newly joining player', async () => {
  ddbMock.on(GetCommand).resolves({ Item: undefined }); // no session, no existing player
  ddbMock.on(PutCommand).resolves({});
  // listPlayers returns a new player row with tokenId: null
  ddbMock.on(QueryCommand).resolves({
    Items: [{ connectionId: 'c1', playerId: 'pNew', name: 'Andrew', score: 0, card: null, tokenId: null }],
  });
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleJoin({ type: 'join', name: 'Andrew' }, 'c1', 'https://x/prod');

  const posts = apiMock.commandCalls(PostToConnectionCommand);
  const bodies = posts.map(p => JSON.parse(p.args[0].input.Data!.toString()));

  const joined = bodies.find((b: any) => b.type === 'joined');
  expect(joined).toBeDefined();
  expect(joined.players[0]).toHaveProperty('tokenId', null);

  const lobbyUpdate = bodies.find((b: any) => b.type === 'lobby_update');
  expect(lobbyUpdate).toBeDefined();
  expect(lobbyUpdate.players[0]).toHaveProperty('tokenId', null);
});
