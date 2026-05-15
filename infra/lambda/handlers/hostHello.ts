import { ensureLobby, listPlayers, getQuoteRound } from '../state';
import { attachPlayer } from '../connections';
import { sendTo } from '../broadcast';
import { LeaderboardEntry, PlayerSummary } from '../protocol';

export async function handleHostHello(connectionId: string, endpoint: string): Promise<void> {
  const session = await ensureLobby();
  await attachPlayer(connectionId, 'HOST', session.cardId, 'host');

  const players = await listPlayers(session.cardId);
  const leaderboard: LeaderboardEntry[] = players
    .map(p => ({ playerId: p.playerId, name: p.name, score: p.score }))
    .sort((a, b) => b.score - a.score);
  const summaries: PlayerSummary[] = players.map(p => ({ playerId: p.playerId, name: p.name, tokenId: p.tokenId }));

  let currentQuote = null;
  if (session.phase === 'live' && session.currentQuoteIndex > 0) {
    const round = await getQuoteRound(session.cardId, session.currentQuoteIndex);
    if (round && !round.revealed) {
      currentQuote = { index: round.index, quote: round.quote, possibleAnswers: round.possibleAnswers };
    }
  }

  await sendTo(endpoint, connectionId, {
    type: 'host_state',
    cardId: session.cardId,
    phase: session.phase,
    currentQuote,
    leaderboard,
    players: summaries,
  });
}
