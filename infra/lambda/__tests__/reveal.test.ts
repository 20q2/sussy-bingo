import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { handleReveal } from '../handlers/reveal';

const ddbMock = mockClient(DynamoDBDocumentClient);
const apiMock = mockClient(ApiGatewayManagementApiClient);
beforeEach(() => { ddbMock.reset(); apiMock.reset(); process.env.TABLE_NAME = 'T'; });

it('scores guesses and broadcasts reveal with leaderboard', async () => {
  ddbMock.on(GetCommand)
    .resolvesOnce({ Item: { role: 'host' } })
    .resolvesOnce({ Item: { cardId: 'c1', phase: 'live', currentQuoteIndex: 1 } })
    .resolvesOnce({ Item: { index: 1, quote: 'q', possibleAnswers: ['A','B'], truth: null, guesses: { p1: { guess: 'Andrew', row: 0, col: 0 }, p2: { guess: 'Tony', row: 1, col: 1 } }, revealed: false } });
  ddbMock.on(QueryCommand).resolves({ Items: [
    { playerId: 'p1', name: 'P1', score: 0 },
    { playerId: 'p2', name: 'P2', score: 0 },
  ]});
  ddbMock.on(PutCommand).resolves({});
  ddbMock.on(UpdateCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleReveal({ type: 'reveal', truth: 'Andrew' }, 'c1', 'https://x/prod');

  const calls = apiMock.commandCalls(PostToConnectionCommand);
  const reveals = calls.filter(c => JSON.parse(c.args[0].input.Data!.toString()).type === 'reveal');
  expect(reveals.length).toBeGreaterThan(0);
  const payload = JSON.parse(reveals[0].args[0].input.Data!.toString());
  expect(payload.perPlayer.find((p: any) => p.playerId === 'p1').correct).toBe(true);
  expect(payload.perPlayer.find((p: any) => p.playerId === 'p2').correct).toBe(false);
  expect(payload.leaderboard.find((p: any) => p.playerId === 'p1').score).toBe(1);
});

it('broadcasts bingo when a player completes 5 in a row', async () => {
  // p1 already has 4 locked cells in row 0 (cols 0..3); current guess locks col 4 → bingo!
  ddbMock.on(GetCommand)
    .resolvesOnce({ Item: { role: 'host' } })
    .resolvesOnce({ Item: { cardId: 'c1', phase: 'live', currentQuoteIndex: 5,
                            lockedCells: { p1: [[0,0],[0,1],[0,2],[0,3]] } } })
    .resolvesOnce({ Item: { index: 5, quote: 'q', possibleAnswers: ['Andrew'], truth: null,
                            guesses: { p1: { guess: 'Andrew', row: 0, col: 4 } }, revealed: false } });
  ddbMock.on(QueryCommand).resolves({ Items: [{ playerId: 'p1', name: 'P1', score: 4 }] });
  ddbMock.on(PutCommand).resolves({});
  ddbMock.on(UpdateCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleReveal({ type: 'reveal', truth: 'Andrew' }, 'c1', 'https://x/prod');

  const messages = apiMock.commandCalls(PostToConnectionCommand)
    .map(c => JSON.parse(c.args[0].input.Data!.toString()));
  const bingo = messages.find(m => m.type === 'bingo');
  expect(bingo).toBeTruthy();
  expect(bingo.winners.length).toBe(1);
  expect(bingo.winners[0].playerId).toBe('p1');
  expect(bingo.winners[0].line.length).toBe(5);
});
