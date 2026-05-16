import type {
  APIGatewayProxyWebsocketEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import { isClientMessage, ClientMessage } from './protocol';
import { putConnection } from './connections';
import { handleJoin } from './handlers/join';
import { handleHostHello } from './handlers/hostHello';
import { handleStartCard } from './handlers/startCard';
import { handleNextQuote } from './handlers/nextQuote';
import { handleGuess } from './handlers/guess';
import { handleReveal } from './handlers/reveal';
import { handleEndGame } from './handlers/endGame';
import { handlePickToken } from './handlers/pickToken';
import { handleClearLobby } from './handlers/clearLobby';
import { handleDisconnect } from './handlers/disconnect';

export const handler = async (
  event: APIGatewayProxyWebsocketEventV2,
): Promise<APIGatewayProxyResultV2> => {
  console.log('INVOKE', JSON.stringify({
    routeKey: event.requestContext?.routeKey,
    connectionId: event.requestContext?.connectionId,
    body: event.body,
  }));
  const { routeKey, connectionId, domainName, stage } = event.requestContext;
  const endpoint = `https://${domainName}/${stage}`;

  try {
    if (routeKey === '$connect') {
      await putConnection(connectionId);
      console.log('CONNECT_OK', connectionId);
      return { statusCode: 200, body: 'connected' };
    }
    if (routeKey === '$disconnect') {
      await handleDisconnect(connectionId, endpoint);
      return { statusCode: 200, body: 'disconnected' };
    }
    // $default
    const msg = parseClientMessage(event.body ?? '');
    if (!msg) {
      console.log('BAD_MESSAGE', event.body);
      return { statusCode: 200, body: 'bad-message' };
    }
    console.log('DISPATCH', msg.type);
    await dispatch(msg, connectionId, endpoint);
    console.log('DISPATCH_OK', msg.type);
    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    console.error('handler error', { routeKey, connectionId, err: err instanceof Error ? { name: err.name, message: err.message, stack: err.stack } : err });
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
    case 'end_game': return handleEndGame(connId, endpoint);
    case 'pick_token': return handlePickToken(msg, connId, endpoint);
    case 'clear_lobby': return handleClearLobby(connId, endpoint);
    default:
      console.warn('unhandled message type', msg.type);
  }
}
