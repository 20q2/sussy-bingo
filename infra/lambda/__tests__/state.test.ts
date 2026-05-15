import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { ensureLobby, getCardSession } from '../state';

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
