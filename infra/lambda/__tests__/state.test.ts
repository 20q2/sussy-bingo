import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { ensureLobby, getCardSession, putPlayer, getPlayer, listPlayers, generateCard, deletePlayerCard } from '../state';
import {
  createQuoteRound, getQuoteRound, recordGuess, markRevealed,
} from '../state';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';

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
    // Every name with positive weight must appear at least once, even when
    // the RNG would otherwise have rolled only 'A'.
    expect(grid.flat()).toContain('A');
    expect(grid.flat()).toContain('B');
  });

  it('guarantees each weighted name appears at least once', () => {
    const weights = [
      { name: 'A', weight: 100 },
      { name: 'B', weight: 1 },
      { name: 'C', weight: 1 },
      { name: 'D', weight: 1 },
      { name: 'E', weight: 1 },
    ];
    // Heavily biased RNG that would normally fill the card with 'A'.
    const grid = generateCard(weights, 5, 5, () => 0);
    const flat = grid.flat();
    for (const { name } of weights) expect(flat).toContain(name);
  });

  it('skips names that cannot fit when there are more names than cells', () => {
    const weights = Array.from({ length: 10 }, (_, i) => ({ name: `N${i}`, weight: 1 }));
    const grid = generateCard(weights, 2, 2, () => 0);
    expect(grid.flat().length).toBe(4);
    // All cells should still be filled with valid names from the weights list.
    const valid = new Set(weights.map(w => w.name));
    expect(grid.flat().every(n => valid.has(n))).toBe(true);
  });

  it('biases rare names toward the center of the card', () => {
    // 50:1 weight ratio. Without the center bias, "Rare" would show up in the
    // center about as often as anywhere else. With the bias, it's much more
    // likely to land in the middle ring than the outer ring.
    const weights = [
      { name: 'Common', weight: 50 },
      { name: 'Rare', weight: 1 },
    ];
    let mt = 1234567;
    const rand = () => { mt = (mt * 1103515245 + 12345) & 0x7fffffff; return mt / 0x7fffffff; };
    let centerRare = 0;
    let outerRare = 0;
    const SAMPLES = 200;
    for (let i = 0; i < SAMPLES; i++) {
      const grid = generateCard(weights, 5, 5, rand);
      if (grid[2][2] === 'Rare') centerRare++;
      // 'Outer' = the four corners of the 5x5 card
      const corners = [grid[0][0], grid[0][4], grid[4][0], grid[4][4]];
      outerRare += corners.filter(n => n === 'Rare').length;
    }
    // Normalize: 1 center cell vs 4 corner cells.
    const centerRate = centerRare / SAMPLES;
    const outerRate = outerRare / (SAMPLES * 4);
    // Center bias should make Rare meaningfully more likely at center than at corners.
    expect(centerRate).toBeGreaterThan(outerRate * 1.5);
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

describe('createQuoteRound', () => {
  it('writes the round at QUOTE#<index>', async () => {
    ddbMock.on(PutCommand).resolves({});
    await createQuoteRound('card1', 1, 'q', ['a', 'b', 'c', 'd']);
    const call = ddbMock.commandCalls(PutCommand).at(-1);
    expect(call?.args[0].input.Item?.quote).toBe('q');
    expect(call?.args[0].input.Item?.revealed).toBe(false);
  });
});

describe('recordGuess', () => {
  it('returns "ok" on a fresh guess', async () => {
    ddbMock.on(UpdateCommand).resolves({});
    expect(await recordGuess('card1', 1, 'p1', 'Andrew')).toBe('ok');
  });
  it('returns "too_late" when conditional check fails', async () => {
    ddbMock.on(UpdateCommand).rejects(
      new ConditionalCheckFailedException({ message: 'cond', $metadata: {} }),
    );
    ddbMock.on(GetCommand).resolves({
      Item: { index: 1, quote: 'q', possibleAnswers: [], truth: 'Andrew', guesses: {}, revealed: true },
    });
    expect(await recordGuess('card1', 1, 'p1', 'Andrew')).toBe('too_late');
  });
});

describe('player tokenId persistence', () => {
  it('round-trips tokenId through putPlayer/getPlayer', async () => {
    const cardId = 'test-card-tokenid';
    ddbMock.on(PutCommand).resolves({});
    ddbMock.on(GetCommand).resolves({
      Item: { playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: 'abc-123' },
    });
    await putPlayer(cardId, {
      playerId: 'p1', name: 'Alice', score: 0, card: null, tokenId: 'abc-123',
    });
    const got = await getPlayer(cardId, 'p1');
    expect(got?.tokenId).toBe('abc-123');
  });

  it('returns null tokenId when not set', async () => {
    const cardId = 'test-card-tokenid-null';
    ddbMock.on(PutCommand).resolves({});
    ddbMock.on(GetCommand).resolves({
      Item: { playerId: 'p2', name: 'Bob', score: 0, card: null, tokenId: null },
    });
    await putPlayer(cardId, {
      playerId: 'p2', name: 'Bob', score: 0, card: null, tokenId: null,
    });
    const got = await getPlayer(cardId, 'p2');
    expect(got?.tokenId).toBeNull();
  });

  it('listPlayers includes tokenId', async () => {
    const cardId = 'test-card-tokenid-list';
    ddbMock.on(PutCommand).resolves({});
    ddbMock.on(QueryCommand).resolves({
      Items: [{ playerId: 'p3', name: 'Carol', score: 0, card: null, tokenId: 'xyz-789' }],
    });
    await putPlayer(cardId, {
      playerId: 'p3', name: 'Carol', score: 0, card: null, tokenId: 'xyz-789',
    });
    const list = await listPlayers(cardId);
    const found = list.find(p => p.playerId === 'p3');
    expect(found?.tokenId).toBe('xyz-789');
  });
});
