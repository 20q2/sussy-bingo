import { randomUUID } from 'crypto';
import { ClientMessage, LeaderboardEntry, PlayerSummary } from '../protocol';
import { ensureLobby, getPlayer, putPlayer, listPlayers, getQuoteRound, generateCard } from '../state';
import { attachPlayer } from '../connections';
import { sendTo, broadcastToAll } from '../broadcast';

export async function handleJoin(
  msg: Extract<ClientMessage, { type: 'join' }>,
  connectionId: string,
  endpoint: string,
): Promise<void> {
  const session = await ensureLobby();

  let playerId = msg.playerId;
  let player = playerId ? await getPlayer(session.cardId, playerId) : null;

  if (!player) {
    playerId = randomUUID();
    let card: string[][] | null = null;
    if (session.phase === 'live' && session.weights) {
      card = generateCard(session.weights, 5, 5);
    }
    player = { playerId, name: msg.name, score: 0, card, tokenId: null };
    await putPlayer(session.cardId, player);
  } else if (player.name !== msg.name) {
    player = { ...player, name: msg.name };
    await putPlayer(session.cardId, player);
  }

  await attachPlayer(connectionId, player.playerId, session.cardId, 'player');

  // Compute current state for direct reply.
  const players = await listPlayers(session.cardId);
  const leaderboard: LeaderboardEntry[] = players
    .map(p => ({ playerId: p.playerId, name: p.name, score: p.score }))
    .sort((a, b) => b.score - a.score);
  const summaries: PlayerSummary[] = players.map(p => ({ playerId: p.playerId, name: p.name, tokenId: p.tokenId }));

  let currentQuote = null;
  let yourGuess: string | null = null;
  if (session.phase === 'live' && session.currentQuoteIndex > 0) {
    const round = await getQuoteRound(session.cardId, session.currentQuoteIndex);
    if (round && !round.revealed) {
      currentQuote = { index: round.index, quote: round.quote, possibleAnswers: round.possibleAnswers };
      yourGuess = round.guesses[player.playerId] ?? null;
    }
  }

  await sendTo(endpoint, connectionId, {
    type: 'joined',
    playerId: player.playerId,
    cardId: session.cardId,
    phase: session.phase,
    name: player.name,
    score: player.score,
    card: player.card,
    currentQuote,
    yourGuess,
    leaderboard,
    players: summaries,
  });

  await broadcastToAll(endpoint, { type: 'lobby_update', players: summaries });
}
