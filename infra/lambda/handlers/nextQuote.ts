import { ClientMessage } from '../protocol';
import { getCardSession, writeCardSession, createQuoteRound } from '../state';
import { getConnection } from '../connections';
import { broadcastToAll, sendTo } from '../broadcast';

export async function handleNextQuote(
  msg: Extract<ClientMessage, { type: 'next_quote' }>,
  connectionId: string,
  endpoint: string,
): Promise<void> {
  const conn = await getConnection(connectionId);
  if (conn?.role !== 'host') {
    await sendTo(endpoint, connectionId, { type: 'error', reason: 'not_host' });
    return;
  }
  const session = await getCardSession();
  if (!session || session.phase !== 'live') {
    await sendTo(endpoint, connectionId, { type: 'error', reason: 'not_live' });
    return;
  }
  const index = session.currentQuoteIndex + 1;
  await createQuoteRound(session.cardId, index, msg.quote, msg.possibleAnswers);
  await writeCardSession({ ...session, currentQuoteIndex: index });
  await broadcastToAll(endpoint, {
    type: 'quote', index, quote: msg.quote, possibleAnswers: msg.possibleAnswers,
  });
}
