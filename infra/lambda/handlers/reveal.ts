import { ClientMessage, LeaderboardEntry } from '../protocol';
import {
  getCardSession, getQuoteRound, markRevealed, listPlayers, putPlayer,
  writeCardSession, findBingo,
} from '../state';
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
    const record = round.guesses[p.playerId];
    const guess = record ? record.guess : null;
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

  // Accumulate the locked cell for every correct guesser and check for 5-in-a-row.
  const lockedCells: Record<string, Array<[number, number]>> = { ...(session.lockedCells ?? {}) };
  const winners: Array<{ playerId: string; name: string; line: Array<[number, number]> }> = [];
  for (const result of perPlayer) {
    if (!result.correct) continue;
    const record = round.guesses[result.playerId];
    if (!record) continue;
    const prior = lockedCells[result.playerId] ?? [];
    const key = `${record.row},${record.col}`;
    const alreadyLocked = prior.some(([r, c]) => `${r},${c}` === key);
    const next = alreadyLocked ? prior : [...prior, [record.row, record.col] as [number, number]];
    lockedCells[result.playerId] = next;
    const line = findBingo(next);
    if (line) winners.push({ playerId: result.playerId, name: result.name, line });
  }
  await writeCardSession({ ...session, lockedCells });

  await broadcastToAll(endpoint, {
    type: 'reveal', index: round.index, truth: msg.truth, perPlayer, leaderboard,
  });

  if (winners.length > 0) {
    await broadcastToAll(endpoint, { type: 'bingo', winners });
  }
}
