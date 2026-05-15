import type {
  APIGatewayProxyWebsocketEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import { isClientMessage, ClientMessage } from './protocol';
import { putConnection, deleteConnection } from './connections';
import { handleJoin } from './handlers/join';
import { handleHostHello } from './handlers/hostHello';
import { handleStartCard } from './handlers/startCard';
import { handleNextQuote } from './handlers/nextQuote';
import { handleGuess } from './handlers/guess';
import { handleReveal } from './handlers/reveal';

export const handler = async (
  event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyResultV2> => {
  const { routeKey, connectionId, domainName, stage } = event.requestContext;
  const endpoint = `https://${domainName}/${stage}`;

  try {
    if (routeKey === '$connect') {
      await putConnection(connectionId);
      return { statusCode: 200, body: 'connected' };
    }
    if (routeKey === '$disconnect') {
      await deleteConnection(connectionId);
      return { statusCode: 200, body: 'disconnected' };
    }
    // $default
    const msg = parseClientMessage(event.body ?? '');
    if (!msg) return { statusCode: 200, body: 'bad-message' };
    await dispatch(msg, connectionId, endpoint);
    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    console.error('handler error', { routeKey, connectionId, err });
    return { statusCode: 200, body: 'error-logged' };
  }
};

function parseClientMessage(raw: string): ClientMessage | null {
  try {
    const outer = JSON.parse(raw);
    const inner = outer && typeof outer === 'object' && 'body' in outer ? outer.body : outer;
    return isClientMessage(inner) ? inner : null;
  } catch { return null; }
}

async function dispatch(msg: ClientMessage, connId: string, endpoint: string): Promise<void> {
  switch (msg.type) {
    case 'join': return handleJoin(msg, connId, endpoint);
    case 'host_hello': return handleHostHello(connId, endpoint);
    case 'start_card': return handleStartCard(msg, connId, endpoint);
    case 'next_quote': return handleNextQuote(msg, connId, endpoint);
    case 'guess': return handleGuess(msg, connId, endpoint);
    case 'reveal': return handleReveal(msg, connId, endpoint);
    default:
      console.warn('unhandled message type', msg.type);
  }
}
