import { ClientMessage, LeaderboardEntry, PlayerSummary } from '../protocol';
import { getCardSession, writeCardSession, listPlayers, putPlayer, generateCard } from '../state';
import { getConnection } from '../connections';
import { broadcastToAll, sendTo } from '../broadcast';
import tokensJson from '../tokens.json';

const BOARD_SIZE = 7;

const ALL_TOKEN_IDS: string[] = (tokensJson as Array<{ id: string }>).map(t => t.id);

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

  // Auto-assign random unused tokens to players who have none.
  const taken = new Set(
    players.map(p => p.tokenId).filter((t): t is string => !!t),
  );
  const available = ALL_TOKEN_IDS.filter(id => !taken.has(id));
  const shuffled = [...available];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  let nextFree = 0;
  for (const p of players) {
    if (p.tokenId === null && nextFree < shuffled.length) {
      p.tokenId = shuffled[nextFree++];
    }
  }

  // One shared board for the whole lobby.
  const card = generateCard(msg.weights, BOARD_SIZE, BOARD_SIZE);

  // Reset every player's score; null out the per-player card (now unused).
  for (const p of players) {
    await putPlayer(session.cardId, { ...p, score: 0, card: null });
  }

  await writeCardSession({
    ...session,
    phase: 'live',
    weights: msg.weights,
    currentQuoteIndex: 0,
    card,
    lockedCells: {},
  });

  // Broadcast updated player summaries so clients see auto-assigned tokenIds
  // throughout the live phase (leaderboard, reveal, host tiles).
  const summaries: PlayerSummary[] = players.map(p => ({
    playerId: p.playerId, name: p.name, tokenId: p.tokenId,
  }));
  await broadcastToAll(endpoint, { type: 'lobby_update', players: summaries });

  const leaderboard: LeaderboardEntry[] = players
    .map(p => ({ playerId: p.playerId, name: p.name, score: 0 }))
    .sort((a, b) => a.name.localeCompare(b.name));

  await broadcastToAll(endpoint, {
    type: 'card_started', cardId: session.cardId, leaderboard, card,
  });
}
