import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { handleEndGame } from '../handlers/endGame';

const ddbMock = mockClient(DynamoDBDocumentClient);
const apiMock = mockClient(ApiGatewayManagementApiClient);
beforeEach(() => { ddbMock.reset(); apiMock.reset(); process.env.TABLE_NAME = 'T'; });

it('resets phase to lobby and drops cards', async () => {
  ddbMock.on(GetCommand)
    .resolvesOnce({ Item: { role: 'host' } })
    .resolves({ Item: { cardId: 'c1', phase: 'live', currentQuoteIndex: 5 } });
  ddbMock.on(QueryCommand).resolves({ Items: [{ playerId: 'p1', name: 'A', score: 3, card: [['x']] }] });
  ddbMock.on(PutCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleEndGame('c1', 'https://x/prod');

  const writes = ddbMock.commandCalls(PutCommand);
  // CardSession write (phase=lobby) + Player write (card=null, score=0)
  const cardSessionWrite = writes.find(w => w.args[0].input.Item?.PK === 'CARD');
  expect(cardSessionWrite?.args[0].input.Item?.phase).toBe('lobby');
});
