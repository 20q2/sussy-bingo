import type {
  APIGatewayProxyWebsocketEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  DeleteCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
  GoneException,
} from '@aws-sdk/client-apigatewaymanagementapi';

const TABLE_NAME = process.env.TABLE_NAME!;
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const TTL_SECONDS = 24 * 60 * 60;

export const handler = async (
  event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyResultV2> => {
  const { routeKey, connectionId, domainName, stage } = event.requestContext;

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
        await fanOut({
          senderConnectionId: connectionId,
          rawBody: event.body ?? '',
          endpoint: `https://${domainName}/${stage}`,
        });
        return { statusCode: 200, body: 'ok' };
    }
  } catch (err) {
    console.error('handler error', { routeKey, connectionId, err });
    return { statusCode: 200, body: 'error-logged' };
  }
};

async function fanOut(args: {
  senderConnectionId: string;
  rawBody: string;
  endpoint: string;
}): Promise<void> {
  const inner = unwrapClientBody(args.rawBody);
  if (inner === null) {
    console.warn('unparseable message body', { rawBody: args.rawBody });
    return;
  }

  const apigw = new ApiGatewayManagementApiClient({ endpoint: args.endpoint });

  const scan = await ddb.send(new ScanCommand({
    TableName: TABLE_NAME,
    ProjectionExpression: 'connectionId',
  }));
  const ids: string[] = (scan.Items ?? [])
    .map((i) => i.connectionId as string)
    .filter((id) => id && id !== args.senderConnectionId);

  const payload = Buffer.from(JSON.stringify({ message: inner }));

  await Promise.all(ids.map(async (id) => {
    try {
      await apigw.send(new PostToConnectionCommand({
        ConnectionId: id,
        Data: payload,
      }));
    } catch (err) {
      if (err instanceof GoneException) {
        await ddb.send(new DeleteCommand({
          TableName: TABLE_NAME,
          Key: { connectionId: id },
        })).catch((e) => console.error('cleanup failed', { id, e }));
      } else {
        console.error('post failed', { id, err });
      }
    }
  }));
}

function unwrapClientBody(rawBody: string): unknown {
  // Client sends socket.send(JSON.stringify({ body: message }))
  // → API Gateway delivers that JSON string as event.body
  // → we parse it, then return the inner `.body` for forwarding
  try {
    const outer = JSON.parse(rawBody);
    if (outer && typeof outer === 'object' && 'body' in outer) {
      return (outer as { body: unknown }).body;
    }
    return outer;
  } catch {
    return null;
  }
}
