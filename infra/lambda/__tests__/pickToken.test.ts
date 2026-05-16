import { beforeEach, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { handlePickToken } from '../handlers/pickToken';

// First entry from tokens.json — a real pool id
const REAL_TOKEN_ID = '9fcb3a3f-c0d4-43d4-8549-826a38bfa27d';
// Second entry for "token B" in re-pick tests
const REAL_TOKEN_ID_B = 'd0f3bd3d-08cf-4783-ae31-03770c8be69c';
const BOGUS_TOKEN_ID = 'not-a-real-id-zzz';

const ddbMock = mockClient(DynamoDBDocumentClient);
const apiMock = mockClient(ApiGatewayManagementApiClient);

beforeEach(() => {
  ddbMock.reset();
  apiMock.reset();
  process.env.TABLE_NAME = 'T';
});

// Helper: build the chain of GetCommand responses that handlePickToken needs:
//   1st Get → CardSession
//   2nd Get → ConnectionRow
//   3rd Get → PlayerRow (me)
function setupGetChain(
  session: object,
  conn: object,
  me: object,
) {
  ddbMock.on(GetCommand)
    .resolvesOnce({ Item: session })   // getCardSession
    .resolvesOnce({ Item: conn })      // getConnection
    .resolvesOnce({ Item: me });       // getPlayer
}

it('claims an unused valid token, persists, and broadcasts lobby_update', async () => {
  setupGetChain(
    { cardId: 'c1', phase: 'lobby', currentQuoteIndex: 0 },
    { connectionId: 'conn1', playerId: 'p1', cardId: 'c1', role: 'player' },
    { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: null },
  );
  // listPlayers (uniqueness check) → no one else holds the token
  ddbMock.on(QueryCommand)
    .resolvesOnce({ Items: [{ playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: null }] })
    // listPlayers (broadcast summaries)
    .resolvesOnce({ Items: [{ playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: REAL_TOKEN_ID }] })
    // listAllConnections (broadcastToAll)
    .resolvesOnce({ Items: [{ connectionId: 'conn1' }] });
  ddbMock.on(PutCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handlePickToken({ type: 'pick_token', tokenId: REAL_TOKEN_ID }, 'conn1', 'https://x/prod');

  // putPlayer should have been called with the new tokenId
  const puts = ddbMock.commandCalls(PutCommand);
  expect(puts.length).toBeGreaterThanOrEqual(1);
  const playerPut = puts.find(c => c.args[0].input.Item?.tokenId === REAL_TOKEN_ID);
  expect(playerPut).toBeDefined();

  // broadcastToAll should have sent a lobby_update
  const posts = apiMock.commandCalls(PostToConnectionCommand);
  expect(posts.length).toBeGreaterThanOrEqual(1);
  const lobbyUpdate = posts.find(p =>
    JSON.parse(p.args[0].input.Data!.toString()).type === 'lobby_update',
  );
  expect(lobbyUpdate).toBeDefined();
});

it('rejects with "unknown_token" when tokenId not in pool', async () => {
  setupGetChain(
    { cardId: 'c1', phase: 'lobby', currentQuoteIndex: 0 },
    { connectionId: 'conn1', playerId: 'p1', cardId: 'c1', role: 'player' },
    { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: null },
  );
  ddbMock.on(PutCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handlePickToken({ type: 'pick_token', tokenId: BOGUS_TOKEN_ID }, 'conn1', 'https://x/prod');

  // putPlayer must NOT be called
  expect(ddbMock.commandCalls(PutCommand)).toHaveLength(0);

  // pick_rejected with reason 'unknown_token' must be sent
  const posts = apiMock.commandCalls(PostToConnectionCommand);
  expect(posts.length).toBeGreaterThanOrEqual(1);
  const rejection = JSON.parse(posts[0].args[0].input.Data!.toString());
  expect(rejection.type).toBe('pick_rejected');
  expect(rejection.reason).toBe('unknown_token');
});

it('rejects with "taken" when another player holds the tokenId', async () => {
  setupGetChain(
    { cardId: 'c1', phase: 'lobby', currentQuoteIndex: 0 },
    { connectionId: 'conn1', playerId: 'p1', cardId: 'c1', role: 'player' },
    { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: null },
  );
  // listPlayers — another player already holds REAL_TOKEN_ID
  ddbMock.on(QueryCommand).resolvesOnce({
    Items: [
      { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: null },
      { playerId: 'p2', name: 'Bob', score: 0, card: null, tokenId: REAL_TOKEN_ID },
    ],
  });
  ddbMock.on(PutCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handlePickToken({ type: 'pick_token', tokenId: REAL_TOKEN_ID }, 'conn1', 'https://x/prod');

  expect(ddbMock.commandCalls(PutCommand)).toHaveLength(0);

  const posts = apiMock.commandCalls(PostToConnectionCommand);
  expect(posts.length).toBeGreaterThanOrEqual(1);
  const rejection = JSON.parse(posts[0].args[0].input.Data!.toString());
  expect(rejection.type).toBe('pick_rejected');
  expect(rejection.reason).toBe('taken');
});

it('rejects with "game_started" when phase is "live"', async () => {
  ddbMock.on(GetCommand).resolvesOnce({ Item: { cardId: 'c1', phase: 'live', currentQuoteIndex: 1 } });
  ddbMock.on(PutCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handlePickToken({ type: 'pick_token', tokenId: REAL_TOKEN_ID }, 'conn1', 'https://x/prod');

  expect(ddbMock.commandCalls(PutCommand)).toHaveLength(0);

  const posts = apiMock.commandCalls(PostToConnectionCommand);
  expect(posts.length).toBeGreaterThanOrEqual(1);
  const rejection = JSON.parse(posts[0].args[0].input.Data!.toString());
  expect(rejection.type).toBe('pick_rejected');
  expect(rejection.reason).toBe('game_started');
});

it('releases the player\'s token when tokenId is null', async () => {
  setupGetChain(
    { cardId: 'c1', phase: 'lobby', currentQuoteIndex: 0 },
    { connectionId: 'conn1', playerId: 'p1', cardId: 'c1', role: 'player' },
    { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: REAL_TOKEN_ID },
  );
  // listPlayers for broadcast summaries (tokenId=null skips uniqueness check)
  ddbMock.on(QueryCommand)
    .resolvesOnce({ Items: [{ playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: null }] })
    // listAllConnections (broadcastToAll)
    .resolvesOnce({ Items: [{ connectionId: 'conn1' }] });
  ddbMock.on(PutCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handlePickToken({ type: 'pick_token', tokenId: null }, 'conn1', 'https://x/prod');

  // putPlayer called with tokenId: null
  const puts = ddbMock.commandCalls(PutCommand);
  expect(puts.length).toBeGreaterThanOrEqual(1);
  const playerPut = puts.find(c => c.args[0].input.Item?.tokenId === null);
  expect(playerPut).toBeDefined();

  // broadcastToAll should have sent a lobby_update
  const posts = apiMock.commandCalls(PostToConnectionCommand);
  const lobbyUpdate = posts.find(p =>
    JSON.parse(p.args[0].input.Data!.toString()).type === 'lobby_update',
  );
  expect(lobbyUpdate).toBeDefined();
});

it('allows re-picking (swap from token A to token B held by no one else)', async () => {
  setupGetChain(
    { cardId: 'c1', phase: 'lobby', currentQuoteIndex: 0 },
    { connectionId: 'conn1', playerId: 'p1', cardId: 'c1', role: 'player' },
    // player currently holds REAL_TOKEN_ID (token A)
    { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: REAL_TOKEN_ID },
  );
  // listPlayers uniqueness check — no one holds token B
  ddbMock.on(QueryCommand)
    .resolvesOnce({
      Items: [
        { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: REAL_TOKEN_ID },
      ],
    })
    // listPlayers for broadcast summaries
    .resolvesOnce({
      Items: [
        { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: REAL_TOKEN_ID_B },
      ],
    })
    // listAllConnections (broadcastToAll)
    .resolvesOnce({ Items: [{ connectionId: 'conn1' }] });
  ddbMock.on(PutCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handlePickToken({ type: 'pick_token', tokenId: REAL_TOKEN_ID_B }, 'conn1', 'https://x/prod');

  // putPlayer called with token B — no rejection
  const puts = ddbMock.commandCalls(PutCommand);
  const playerPut = puts.find(c => c.args[0].input.Item?.tokenId === REAL_TOKEN_ID_B);
  expect(playerPut).toBeDefined();

  const posts = apiMock.commandCalls(PostToConnectionCommand);
  const anyRejection = posts.find(p =>
    JSON.parse(p.args[0].input.Data!.toString()).type === 'pick_rejected',
  );
  expect(anyRejection).toBeUndefined();
});

it('allows picking your own currently-held token (overwrite succeeds, no rejection)', async () => {
  setupGetChain(
    { cardId: 'c1', phase: 'lobby', currentQuoteIndex: 0 },
    { connectionId: 'conn1', playerId: 'p1', cardId: 'c1', role: 'player' },
    // player already holds REAL_TOKEN_ID
    { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: REAL_TOKEN_ID },
  );
  // listPlayers — only p1 holds it (not "someone else")
  ddbMock.on(QueryCommand)
    .resolvesOnce({
      Items: [{ playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: REAL_TOKEN_ID }],
    })
    // listPlayers for broadcast summaries
    .resolvesOnce({
      Items: [{ playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: REAL_TOKEN_ID }],
    })
    // listAllConnections (broadcastToAll)
    .resolvesOnce({ Items: [{ connectionId: 'conn1' }] });
  ddbMock.on(PutCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handlePickToken({ type: 'pick_token', tokenId: REAL_TOKEN_ID }, 'conn1', 'https://x/prod');

  // putPlayer must be called (overwrite)
  const puts = ddbMock.commandCalls(PutCommand);
  const playerPut = puts.find(c => c.args[0].input.Item?.tokenId === REAL_TOKEN_ID);
  expect(playerPut).toBeDefined();

  // No rejection
  const posts = apiMock.commandCalls(PostToConnectionCommand);
  const anyRejection = posts.find(p =>
    JSON.parse(p.args[0].input.Data!.toString()).type === 'pick_rejected',
  );
  expect(anyRejection).toBeUndefined();
});
