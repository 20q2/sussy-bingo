import { getCardSession, writeCardSession, listPlayers, deletePlayer } from '../state';
import { getConnection } from '../connections';
import { broadcastToAll, sendTo } from '../broadcast';

export async function handleClearLobby(connectionId: string, endpoint: string): Promise<void> {
  const conn = await getConnection(connectionId);
  if (conn?.role !== 'host') {
    await sendTo(endpoint, connectionId, { type: 'error', reason: 'not_host' });
    return;
  }
  const session = await getCardSession();
  if (!session) return;

  const players = await listPlayers(session.cardId);
  for (const p of players) {
    await deletePlayer(session.cardId, p.playerId);
  }

  await writeCardSession({
    ...session, phase: 'lobby', currentQuoteIndex: 0, weights: undefined, card: undefined,
  });

  await broadcastToAll(endpoint, { type: 'lobby_cleared' });
  await broadcastToAll(endpoint, { type: 'lobby_update', players: [] });
}
