import { getCardSession, writeCardSession, listPlayers, putPlayer } from '../state';
import { getConnection } from '../connections';
import { broadcastToAll, sendTo } from '../broadcast';
import { PlayerSummary } from '../protocol';

export async function handleEndGame(connectionId: string, endpoint: string): Promise<void> {
  const conn = await getConnection(connectionId);
  if (conn?.role !== 'host') {
    await sendTo(endpoint, connectionId, { type: 'error', reason: 'not_host' });
    return;
  }
  const session = await getCardSession();
  if (!session) return;

  await writeCardSession({ ...session, phase: 'lobby', currentQuoteIndex: 0, weights: undefined, card: undefined });

  const players = await listPlayers(session.cardId);
  for (const p of players) {
    await putPlayer(session.cardId, { ...p, card: null, score: 0, tokenId: null });
  }
  const summaries: PlayerSummary[] = players.map(p => ({
    playerId: p.playerId, name: p.name, tokenId: null,
  }));
  await broadcastToAll(endpoint, { type: 'returned_to_lobby', players: summaries });
}
