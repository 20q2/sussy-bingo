import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { handleNextQuote } from '../handlers/nextQuote';

const ddbMock = mockClient(DynamoDBDocumentClient);
const apiMock = mockClient(ApiGatewayManagementApiClient);
beforeEach(() => { ddbMock.reset(); apiMock.reset(); process.env.TABLE_NAME = 'T'; });

it('increments quote index, writes round, broadcasts quote', async () => {
  ddbMock.on(GetCommand)
    .resolvesOnce({ Item: { role: 'host' } })
    .resolves({ Item: { cardId: 'c', phase: 'live', currentQuoteIndex: 2 } });
  ddbMock.on(PutCommand).resolves({});
  ddbMock.on(QueryCommand).resolves({ Items: [{ connectionId: 'c1' }] });
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleNextQuote(
    { type: 'next_quote', quote: 'hello', possibleAnswers: ['A','B','C','D'] },
    'c1', 'https://x/prod',
  );

  const out = JSON.parse(apiMock.commandCalls(PostToConnectionCommand)[0].args[0].input.Data!.toString());
  expect(out.type).toBe('quote');
  expect(out.index).toBe(3);
});
