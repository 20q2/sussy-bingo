import { ClientMessage, LeaderboardEntry } from '../protocol';
import { getCardSession, getQuoteRound, markRevealed, listPlayers, putPlayer } from '../state';
import { getConnection } from '../connections';
import { broadcastToAll, sendTo } from '../broadcast';

export async function handleReveal(
  msg: Extract<ClientMessage, { type: 'reveal' }>,
  connectionId: string,
  endpoint: string,
): Promise<void> {
  const conn = await getConnection(connectionId);
  if (conn?.role !== 'host') {
    await sendTo(endpoint, connectionId, { type: 'error', reason: 'not_host' });
    return;
  }
  const session = await getCardSession();
  if (!session || session.phase !== 'live') return;
  const round = await getQuoteRound(session.cardId, session.currentQuoteIndex);
  if (!round || round.revealed) return;

  await markRevealed(session.cardId, round.index, msg.truth);

  const players = await listPlayers(session.cardId);
  const perPlayer = players.map(p => {
    const guess = round.guesses[p.playerId] ?? null;
    const correct = guess === msg.truth;
    return { playerId: p.playerId, name: p.name, guess, correct };
  });
  const updatedPlayers = players.map(p => {
    const result = perPlayer.find(x => x.playerId === p.playerId)!;
    return result.correct ? { ...p, score: p.score + 1 } : p;
  });
  for (const updated of updatedPlayers) {
    const original = players.find(p => p.playerId === updated.playerId)!;
    if (updated.score !== original.score) {
      await putPlayer(session.cardId, updated);
    }
  }
  const leaderboard: LeaderboardEntry[] = updatedPlayers
    .map(p => ({ playerId: p.playerId, name: p.name, score: p.score }))
    .sort((a, b) => b.score - a.score);

  await broadcastToAll(endpoint, {
    type: 'reveal', index: round.index, truth: msg.truth, perPlayer, leaderboard,
  });
}
