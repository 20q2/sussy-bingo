import { beforeEach, describe, it, expect } from 'vitest';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { handleHostHello } from '../handlers/hostHello';

const ddbMock = mockClient(DynamoDBDocumentClient);
const apiMock = mockClient(ApiGatewayManagementApiClient);
beforeEach(() => { ddbMock.reset(); apiMock.reset(); process.env.TABLE_NAME = 'T'; });

it('attaches host role and sends host_state', async () => {
  ddbMock.on(GetCommand).resolves({ Item: undefined });
  ddbMock.on(PutCommand).resolves({});
  ddbMock.on(QueryCommand).resolves({ Items: [] });
  apiMock.on(PostToConnectionCommand).resolves({});

  await handleHostHello('c1', 'https://x/prod');

  const sent = JSON.parse(apiMock.commandCalls(PostToConnectionCommand)[0].args[0].input.Data!.toString());
  expect(sent.type).toBe('host_state');
  expect(sent.phase).toBe('lobby');
});
