import { ClientMessage } from '../protocol';
import { recordGuess } from '../state';
import { getConnection } from '../connections';
import { sendTo } from '../broadcast';

export async function handleGuess(
  msg: Extract<ClientMessage, { type: 'guess' }>,
  connectionId: string,
  endpoint: string,
): Promise<void> {
  const conn = await getConnection(connectionId);
  if (conn?.role !== 'player' || !conn.playerId || !conn.cardId) {
    await sendTo(endpoint, connectionId, {
      type: 'guess_rejected', quoteIndex: msg.quoteIndex, reason: 'not_a_player',
    });
    return;
  }
  const outcome = await recordGuess(conn.cardId, msg.quoteIndex, conn.playerId, msg.guess);
  if (outcome === 'ok') {
    await sendTo(endpoint, connectionId, { type: 'guess_ack', quoteIndex: msg.quoteIndex, guess: msg.guess });
  } else {
    await sendTo(endpoint, connectionId, { type: 'guess_rejected', quoteIndex: msg.quoteIndex, reason: outcome });
  }
}
