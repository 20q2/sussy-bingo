import { PlayerSummary } from '../protocol';
import { getCardSession, getPlayer, putPlayer, listPlayers } from '../state';
import { getConnection, deleteConnection } from '../connections';
import { broadcastToAll } from '../broadcast';

export async function handleDisconnect(connectionId: string, endpoint: string): Promise<void> {
  const conn = await getConnection(connectionId);
  await deleteConnection(connectionId);
  if (!conn?.playerId || !conn?.cardId) return;

  // Only free held tokens during the lobby phase. In live phase the player
  // may be briefly offline; keeping their token preserves their identity
  // on the leaderboard and reveal screens when they reconnect.
  const session = await getCardSession();
  if (session?.phase !== 'lobby') return;

  const player = await getPlayer(conn.cardId, conn.playerId);
  if (!player || player.tokenId === null) return;

  await putPlayer(conn.cardId, { ...player, tokenId: null });
  const players = await listPlayers(conn.cardId);
  const summaries: PlayerSummary[] = players.map(p => ({
    playerId: p.playerId, name: p.name, tokenId: p.tokenId,
  }));
  await broadcastToAll(endpoint, { type: 'lobby_update', players: summaries });
}
