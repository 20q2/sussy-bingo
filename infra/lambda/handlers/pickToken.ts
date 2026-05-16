import { ClientMessage, PlayerSummary } from '../protocol';
import { getCardSession, getPlayer, putPlayer, listPlayers } from '../state';
import { getConnection } from '../connections';
import { sendTo, broadcastToAll } from '../broadcast';
import tokensJson from '../tokens.json';

const VALID_TOKEN_IDS: Set<string> = new Set(
  (tokensJson as Array<{ id: string }>).map(t => t.id),
);

export async function handlePickToken(
  msg: Extract<ClientMessage, { type: 'pick_token' }>,
  connectionId: string,
  endpoint: string,
): Promise<void> {
  const session = await getCardSession();
  if (!session) return;

  if (session.phase !== 'lobby') {
    await sendTo(endpoint, connectionId, { type: 'pick_rejected', reason: 'game_started' });
    return;
  }

  if (msg.tokenId !== null && !VALID_TOKEN_IDS.has(msg.tokenId)) {
    await sendTo(endpoint, connectionId, { type: 'pick_rejected', reason: 'unknown_token' });
    return;
  }

  const conn = await getConnection(connectionId);
  if (!conn?.playerId) return;
  const me = await getPlayer(session.cardId, conn.playerId);
  if (!me) return;

  if (msg.tokenId !== null) {
    const players = await listPlayers(session.cardId);
    const heldBySomeoneElse = players.some(
      p => p.tokenId === msg.tokenId && p.playerId !== me.playerId,
    );
    if (heldBySomeoneElse) {
      await sendTo(endpoint, connectionId, { type: 'pick_rejected', reason: 'taken' });
      return;
    }
  }

  await putPlayer(session.cardId, { ...me, tokenId: msg.tokenId });

  const players = await listPlayers(session.cardId);
  const summaries: PlayerSummary[] = players.map(p => ({
    playerId: p.playerId,
    name: p.name,
    tokenId: p.tokenId,
  }));
  await broadcastToAll(endpoint, { type: 'lobby_update', players: summaries });
}
