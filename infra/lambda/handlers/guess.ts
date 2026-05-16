import { ClientMessage } from '../protocol';
import { recordGuess } from '../state';
import { getConnection } from '../connections';
import { sendTo, broadcastToAll } from '../broadcast';

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
  const outcome = await recordGuess(conn.cardId, msg.quoteIndex, conn.playerId, msg.guess, msg.row, msg.col);
  if (outcome === 'ok') {
    await sendTo(endpoint, connectionId, { type: 'guess_ack', quoteIndex: msg.quoteIndex, guess: msg.guess });
    await broadcastToAll(endpoint, {
      type: 'guess_placed',
      quoteIndex: msg.quoteIndex,
      playerId: conn.playerId,
      row: msg.row,
      col: msg.col,
    });
  } else {
    await sendTo(endpoint, connectionId, { type: 'guess_rejected', quoteIndex: msg.quoteIndex, reason: outcome });
  }
}
