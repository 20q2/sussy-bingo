import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, PutCommand, DeleteCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { putConnection, deleteConnection, getConnection, attachPlayer } from '../connections';

const ddbMock = mockClient(DynamoDBDocumentClient);
beforeEach(() => { ddbMock.reset(); process.env.TABLE_NAME = 'TestTable'; });

it('putConnection writes a CONN row', async () => {
  ddbMock.on(PutCommand).resolves({});
  await putConnection('c1');
  expect(ddbMock.commandCalls(PutCommand).length).toBe(1);
});

it('deleteConnection removes the row', async () => {
  ddbMock.on(DeleteCommand).resolves({});
  await deleteConnection('c1');
  expect(ddbMock.commandCalls(DeleteCommand).length).toBe(1);
});

it('attachPlayer sets role and playerId', async () => {
  ddbMock.on(PutCommand).resolves({});
  await attachPlayer('c1', 'p1', 'card1', 'player');
  const item = ddbMock.commandCalls(PutCommand).at(-1)?.args[0].input.Item;
  expect(item?.role).toBe('player');
  expect(item?.playerId).toBe('p1');
});
