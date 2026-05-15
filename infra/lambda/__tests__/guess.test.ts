import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { handleGuess } from '../handlers/guess';

const ddbMock = mockClient(DynamoDBDocumentClient);
const apiMock = mockClient(ApiGatewayManagementApiClient);
beforeEach(() => { ddbMock.reset(); apiMock.reset(); process.env.TABLE_NAME = 'T'; });

it('sends guess_ack on success', async () => {
  ddbMock.on(GetCommand).resolves({ Item: { role: 'player', playerId: 'p1', cardId: 'c1' } });
  ddbMock.on(UpdateCommand).resolves({});
  apiMock.on(PostToConnectionCommand).resolves({});
  await handleGuess({ type: 'guess', quoteIndex: 3, guess: 'Andrew' }, 'c1', 'https://x/prod');
  const sent = JSON.parse(apiMock.commandCalls(PostToConnectionCommand)[0].args[0].input.Data!.toString());
  expect(sent.type).toBe('guess_ack');
});

it('sends guess_rejected too_late on conditional fail', async () => {
  ddbMock.on(GetCommand)
    .resolvesOnce({ Item: { role: 'player', playerId: 'p1', cardId: 'c1' } })
    .resolves({ Item: { revealed: true, quote: 'q', possibleAnswers: [], guesses: {} } });
  ddbMock.on(UpdateCommand).rejects(new ConditionalCheckFailedException({ message: '', $metadata: {} }));
  apiMock.on(PostToConnectionCommand).resolves({});
  await handleGuess({ type: 'guess', quoteIndex: 3, guess: 'Andrew' }, 'c1', 'https://x/prod');
  const sent = JSON.parse(apiMock.commandCalls(PostToConnectionCommand)[0].args[0].input.Data!.toString());
  expect(sent.type).toBe('guess_rejected');
  expect(sent.reason).toBe('too_late');
});
