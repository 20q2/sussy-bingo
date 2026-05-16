import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ServerMessage, LeaderboardEntry, PlayerSummary, Phase,
} from '../models/protocol';

export interface CurrentQuote { index: number; quote: string; possibleAnswers: string[]; }
export interface MyInfo { playerId: string; name: string; cardId: string; score: number; }
export interface LastReveal {
  index: number; truth: string;
  perPlayer: { playerId: string; name: string; guess: string | null; correct: boolean }[];
}

export interface CellPlacement { row: number; col: number; }
export interface BingoWinner { playerId: string; name: string; line: Array<[number, number]>; }
export interface GameState {
  phase: Phase | 'unknown';
  me: MyInfo | null;
  card: string[][] | null;
  players: PlayerSummary[];
  leaderboard: LeaderboardEntry[];
  currentQuote: CurrentQuote | null;
  yourGuess: string | null;
  lastReveal: LastReveal | null;
  /** Where each player has dropped a token for the current quote, keyed by playerId. Cleared on each new quote. */
  placements: Record<string, CellPlacement>;
  /** Per-player cumulative list of correctly-locked cells, persisted server-side
   *  across the live phase. Survives reconnect/refresh. */
  lockedCells: Record<string, Array<[number, number]>>;
  /** Set once the server announces a bingo (5-in-a-row). The game freezes. */
  bingoWinners: BingoWinner[] | null;
}

const initial: GameState = {
  phase: 'unknown', me: null, card: null, players: [], leaderboard: [],
  currentQuote: null, yourGuess: null, lastReveal: null, placements: {},
  lockedCells: {}, bingoWinners: null,
};

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private subject = new BehaviorSubject<GameState>(initial);
  readonly state$ = this.subject.asObservable();

  snapshot(): GameState { return this.subject.value; }

  apply(msg: ServerMessage): void {
    const s = this.subject.value;
    switch (msg.type) {
      case 'joined':
        this.subject.next({
          ...s, phase: msg.phase,
          me: { playerId: msg.playerId, name: msg.name, cardId: msg.cardId, score: msg.score },
          card: msg.card, players: msg.players, leaderboard: msg.leaderboard,
          currentQuote: msg.currentQuote, yourGuess: msg.yourGuess, lastReveal: null,
          placements: msg.placements ?? {},
          lockedCells: msg.lockedCells ?? {},
        });
        return;
      case 'host_state':
        this.subject.next({
          ...s, phase: msg.phase, players: msg.players, leaderboard: msg.leaderboard,
          currentQuote: msg.currentQuote, card: msg.card, yourGuess: null, lastReveal: null,
        });
        return;
      case 'lobby_update':
        this.subject.next({ ...s, players: msg.players });
        return;
      case 'card_started':
        this.subject.next({ ...s, phase: 'live', leaderboard: msg.leaderboard, card: msg.card, currentQuote: null, yourGuess: null, lastReveal: null, placements: {}, lockedCells: {}, bingoWinners: null });
        return;
      case 'quote':
        this.subject.next({ ...s, currentQuote: { index: msg.index, quote: msg.quote, possibleAnswers: msg.possibleAnswers }, yourGuess: null, lastReveal: null, placements: {} });
        return;
      case 'guess_ack':
        if (s.currentQuote?.index === msg.quoteIndex) {
          this.subject.next({ ...s, yourGuess: msg.guess });
        }
        return;
      case 'guess_placed':
        if (s.currentQuote?.index === msg.quoteIndex) {
          this.subject.next({
            ...s,
            placements: { ...s.placements, [msg.playerId]: { row: msg.row, col: msg.col } },
          });
        }
        return;
      case 'guess_rejected':
        if (s.currentQuote?.index === msg.quoteIndex) {
          this.subject.next({ ...s, yourGuess: null });
        }
        return;
      case 'reveal': {
        // Wrong guessers' chips clear off the board on reveal; correct guessers' chips stay.
        const correctIds = new Set(msg.perPlayer.filter(p => p.correct).map(p => p.playerId));
        const keptPlacements: Record<string, CellPlacement> = {};
        for (const pid of Object.keys(s.placements)) {
          if (correctIds.has(pid)) keptPlacements[pid] = s.placements[pid];
        }
        // Append each correct guesser's (row,col) to lockedCells so the
        // green-square / sticky-token history is kept in shared state and
        // survives a refresh (server hydrates it back via 'joined').
        const lockedCells: Record<string, Array<[number, number]>> = { ...s.lockedCells };
        for (const result of msg.perPlayer) {
          if (!result.correct) continue;
          const placement = s.placements[result.playerId];
          if (!placement) continue;
          const prior = lockedCells[result.playerId] ?? [];
          const already = prior.some(([r, c]) => r === placement.row && c === placement.col);
          lockedCells[result.playerId] = already ? prior : [...prior, [placement.row, placement.col]];
        }
        this.subject.next({
          ...s,
          leaderboard: msg.leaderboard,
          lastReveal: { index: msg.index, truth: msg.truth, perPlayer: msg.perPlayer },
          placements: keptPlacements,
          lockedCells,
          me: s.me ? { ...s.me, score: msg.leaderboard.find(l => l.playerId === s.me!.playerId)?.score ?? s.me.score } : s.me,
        });
        return;
      }
      case 'returned_to_lobby':
        this.subject.next({ ...s, phase: 'lobby', card: null, currentQuote: null, yourGuess: null, lastReveal: null, players: msg.players, leaderboard: [], placements: {}, lockedCells: {}, bingoWinners: null });
        return;
      case 'bingo':
        this.subject.next({ ...s, bingoWinners: msg.winners });
        return;
      case 'pick_rejected':
        console.warn('pick rejected:', msg.reason);
        return;
      case 'lobby_cleared':
        this.subject.next({ ...initial, phase: 'lobby' });
        return;
      case 'error':
        console.error('server error', msg.reason);
        return;
    }
  }
}
