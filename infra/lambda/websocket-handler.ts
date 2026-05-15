import type {
  APIGatewayProxyWebsocketEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = process.env.TABLE_NAME!;
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const TTL_SECONDS = 24 * 60 * 60;

export const handler = async (
  event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyResultV2> => {
  const { routeKey, connectionId } = event.requestContext;

  try {
    switch (routeKey) {
      case '$connect':
        await ddb.send(new PutCommand({
          TableName: TABLE_NAME,
          Item: {
            connectionId,
            ttl: Math.floor(Date.now() / 1000) + TTL_SECONDS,
          },
        }));
        return { statusCode: 200, body: 'connected' };

      case '$disconnect':
        await ddb.send(new DeleteCommand({
          TableName: TABLE_NAME,
          Key: { connectionId },
        }));
        return { statusCode: 200, body: 'disconnected' };

      default:
        // $default fan-out implemented in next task
        return { statusCode: 200, body: 'ok' };
    }
  } catch (err) {
    console.error('handler error', { routeKey, connectionId, err });
    return { statusCode: 200, body: 'error-logged' };
  }
};
