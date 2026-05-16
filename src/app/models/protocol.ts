export type Role = 'host' | 'player';
export type Phase = 'lobby' | 'live';

export interface NameWeight { name: string; weight: number; }

// Client → Server
export type ClientMessage =
  | { type: 'join'; name: string; playerId?: string }
  | { type: 'host_hello' }
  | { type: 'start_card'; weights: NameWeight[] }
  | { type: 'next_quote'; quote: string; possibleAnswers: string[] }
  | { type: 'guess'; quoteIndex: number; guess: string; row: number; col: number }
  | { type: 'reveal'; truth: string }
  | { type: 'end_game' }
  | { type: 'pick_token'; tokenId: string | null }
  | { type: 'clear_lobby' };

// Server → Client
export type ServerMessage =
  | { type: 'joined'; playerId: string; cardId: string; phase: Phase; name: string; score: number;
      card: string[][] | null; currentQuote: { index: number; quote: string; possibleAnswers: string[] } | null;
      yourGuess: string | null; leaderboard: LeaderboardEntry[]; players: PlayerSummary[] }
  | { type: 'host_state'; cardId: string; phase: Phase;
      currentQuote: { index: number; quote: string; possibleAnswers: string[] } | null;
      leaderboard: LeaderboardEntry[]; players: PlayerSummary[]; card: string[][] | null }
  | { type: 'lobby_update'; players: PlayerSummary[] }
  | { type: 'card_started'; cardId: string; leaderboard: LeaderboardEntry[]; card: string[][] }
  | { type: 'quote'; index: number; quote: string; possibleAnswers: string[] }
  | { type: 'guess_ack'; quoteIndex: number; guess: string }
  | { type: 'guess_placed'; quoteIndex: number; playerId: string; row: number; col: number }
  | { type: 'guess_rejected'; quoteIndex: number; reason: 'too_late' | 'unknown_quote' | 'not_a_player' }
  | { type: 'reveal'; index: number; truth: string;
      perPlayer: { playerId: string; name: string; guess: string | null; correct: boolean }[];
      leaderboard: LeaderboardEntry[] }
  | { type: 'returned_to_lobby'; players: PlayerSummary[] }
  | { type: 'error'; reason: string }
  | { type: 'pick_rejected'; reason: 'taken' | 'unknown_token' | 'game_started' }
  | { type: 'lobby_cleared' };

export interface LeaderboardEntry { playerId: string; name: string; score: number; }
export interface PlayerSummary { playerId: string; name: string; tokenId: string | null; }

export function isClientMessage(value: unknown): value is ClientMessage {
  if (!value || typeof value !== 'object') return false;
  const t = (value as { type?: unknown }).type;
  return typeof t === 'string';
}
