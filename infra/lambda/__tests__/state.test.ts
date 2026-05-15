import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { ensureLobby, getCardSession, putPlayer, getPlayer, listPlayers, generateCard, deletePlayerCard } from '../state';

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => { ddbMock.reset(); process.env.TABLE_NAME = 'TestTable'; });

describe('ensureLobby', () => {
  it('creates a new lobby when no current card exists', async () => {
    ddbMock.on(GetCommand).resolves({ Item: undefined });
    ddbMock.on(PutCommand).resolves({});
    const sess = await ensureLobby();
    expect(sess.phase).toBe('lobby');
    expect(sess.cardId).toMatch(/[a-z0-9-]{6,}/);
    expect(ddbMock.commandCalls(PutCommand).length).toBe(1);
  });

  it('returns existing session when one exists', async () => {
    ddbMock.on(GetCommand).resolves({
      Item: { PK: 'CARD', SK: 'CURRENT', cardId: 'abc123', phase: 'live', currentQuoteIndex: 2 },
    });
    const sess = await ensureLobby();
    expect(sess.cardId).toBe('abc123');
    expect(sess.phase).toBe('live');
    expect(ddbMock.commandCalls(PutCommand).length).toBe(0);
  });
});

describe('getCardSession', () => {
  it('returns null when nothing exists', async () => {
    ddbMock.on(GetCommand).resolves({ Item: undefined });
    expect(await getCardSession()).toBeNull();
  });
});

describe('generateCard', () => {
  it('produces a width×height grid from weighted names', () => {
    const grid = generateCard(
      [{ name: 'A', weight: 10 }, { name: 'B', weight: 1 }],
      5, 5,
      () => 0, // always rolls index 0
    );
    expect(grid.length).toBe(5);
    expect(grid[0].length).toBe(5);
    expect(grid.flat().every(name => name === 'A')).toBe(true);
  });
});

describe('putPlayer / getPlayer', () => {
  it('round-trips a player row', async () => {
    ddbMock.on(PutCommand).resolves({});
    ddbMock.on(GetCommand).resolves({ Item: { name: 'Andrew', score: 3, card: null } });
    await putPlayer('card1', { playerId: 'p1', name: 'Andrew', score: 0, card: null });
    const p = await getPlayer('card1', 'p1');
    expect(p?.name).toBe('Andrew');
  });
});

describe('listPlayers', () => {
  it('queries by cardId partition', async () => {
    ddbMock.on(QueryCommand).resolves({
      Items: [
        { playerId: 'p1', name: 'A', score: 2 },
        { playerId: 'p2', name: 'B', score: 0 },
      ],
    });
    const players = await listPlayers('card1');
    expect(players.length).toBe(2);
    expect(players[0].name).toBe('A');
  });
});
