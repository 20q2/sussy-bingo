import { ClientMessage, LeaderboardEntry } from '../protocol';
import { getCardSession, writeCardSession, listPlayers, putPlayer, generateCard } from '../state';
import { getConnection, listAllConnections } from '../connections';
import { broadcastToAll, sendTo } from '../broadcast';

export async function handleStartCard(
  msg: Extract<ClientMessage, { type: 'start_card' }>,
  connectionId: string,
  endpoint: string,
): Promise<void> {
  const conn = await getConnection(connectionId);
  if (conn?.role !== 'host') {
    await sendTo(endpoint, connectionId, { type: 'error', reason: 'not_host' });
    return;
  }
  const session = await getCardSession();
  if (!session) return;

  // Reset scores + regenerate cards for every existing player.
  // Track the freshly-generated cards locally so we can deliver them without re-reading.
  const players = await listPlayers(session.cardId);
  const newCards = new Map<string, string[][]>();
  for (const p of players) {
    const card = generateCard(msg.weights, 5, 5);
    newCards.set(p.playerId, card);
    await putPlayer(session.cardId, { ...p, score: 0, card });
  }

  await writeCardSession({
    ...session,
    phase: 'live',
    weights: msg.weights,
    currentQuoteIndex: 0,
  });

  const leaderboard: LeaderboardEntry[] = players
    .map(p => ({ playerId: p.playerId, name: p.name, score: 0 }))
    .sort((a, b) => a.name.localeCompare(b.name));

  await broadcastToAll(endpoint, {
    type: 'card_started', cardId: session.cardId, leaderboard,
  });

  // Per-player your_card delivery
  const conns = await listAllConnections();
  for (const c of conns) {
    if (c.role !== 'player' || !c.playerId) continue;
    const card = newCards.get(c.playerId);
    if (card) {
      await sendTo(endpoint, c.connectionId, { type: 'your_card', card });
    }
  }
}
