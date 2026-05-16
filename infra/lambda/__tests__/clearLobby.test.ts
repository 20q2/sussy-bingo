import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, QueryCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { handleClearLobby } from '../handlers/clearLobby';

const ddbMock = mockClient(DynamoDBDocumentClient);
const apiMock = mockClient(ApiGatewayManagementApiClient);

beforeEach(() => { ddbMock.reset(); apiMock.reset(); process.env.TABLE_NAME = 'T'; });

describe('handleClearLobby', () => {
  it('rejects non-host with an error', async () => {
    ddbMock.on(GetCommand).resolves({ Item: { role: 'player' } });
    apiMock.on(PostToConnectionCommand).resolves({});

    await handleClearLobby('c1', 'https://x/prod');

    expect(ddbMock.commandCalls(DeleteCommand).length).toBe(0);
    const posts = apiMock.commandCalls(PostToConnectionCommand);
    const messages = posts.map(p => JSON.parse(new TextDecoder().decode(p.args[0].input.Data as Uint8Array)));
    expect(messages).toContainEqual(expect.objectContaining({ type: 'error', reason: 'not_host' }));
  });

  it('deletes every player row and broadcasts lobby_cleared + empty lobby_update', async () => {
    ddbMock.on(GetCommand)
      .resolvesOnce({ Item: { role: 'host' } })
      .resolves({ Item: { cardId: 'c1', phase: 'lobby', currentQuoteIndex: 0 } });
    ddbMock.on(QueryCommand).resolves({ Items: [
      { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: 'tok-a' },
      { playerId: 'p2', name: 'Bob',   score: 2, card: null, tokenId: 'tok-b' },
    ] });
    ddbMock.on(PutCommand).resolves({});
    ddbMock.on(DeleteCommand).resolves({});
    apiMock.on(PostToConnectionCommand).resolves({});

    await handleClearLobby('host-conn', 'https://x/prod');

    const deletes = ddbMock.commandCalls(DeleteCommand);
    expect(deletes.length).toBe(2);
    const deletedSKs = deletes.map(d => String(d.args[0].input.Key?.SK ?? ''));
    expect(deletedSKs).toEqual(expect.arrayContaining(['PLAYER#p1', 'PLAYER#p2']));

    const posts = apiMock.commandCalls(PostToConnectionCommand);
    const messages = posts.map(p => JSON.parse(new TextDecoder().decode(p.args[0].input.Data as Uint8Array)));
    expect(messages).toContainEqual({ type: 'lobby_cleared' });
    expect(messages).toContainEqual({ type: 'lobby_update', players: [] });
  });
});
