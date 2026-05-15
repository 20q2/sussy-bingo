import {
  ApiGatewayManagementApiClient, PostToConnectionCommand, GoneException,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { ServerMessage } from './protocol';
import { listAllConnections, deleteConnection, ConnectionRow } from './connections';

export async function sendTo(endpoint: string, connectionId: string, msg: ServerMessage): Promise<void> {
  const apigw = new ApiGatewayManagementApiClient({ endpoint });
  try {
    await apigw.send(new PostToConnectionCommand({
      ConnectionId: connectionId,
      Data: Buffer.from(JSON.stringify(msg)),
    }));
  } catch (err) {
    if (err instanceof GoneException) {
      await deleteConnection(connectionId).catch(() => {});
    } else { throw err; }
  }
}

export async function broadcastToAll(endpoint: string, msg: ServerMessage): Promise<void> {
  const conns = await listAllConnections();
  await postMany(endpoint, conns, msg);
}

export async function broadcastWhere(
  endpoint: string,
  predicate: (c: ConnectionRow) => boolean,
  msg: ServerMessage,
): Promise<void> {
  const conns = (await listAllConnections()).filter(predicate);
  await postMany(endpoint, conns, msg);
}

async function postMany(endpoint: string, conns: ConnectionRow[], msg: ServerMessage): Promise<void> {
  const apigw = new ApiGatewayManagementApiClient({ endpoint });
  const payload = Buffer.from(JSON.stringify(msg));
  await Promise.all(conns.map(async (c) => {
    try {
      await apigw.send(new PostToConnectionCommand({ ConnectionId: c.connectionId, Data: payload }));
    } catch (err) {
      if (err instanceof GoneException) {
        await deleteConnection(c.connectionId).catch(() => {});
      } else {
        console.error('post failed', { id: c.connectionId, err });
      }
    }
  }));
}
