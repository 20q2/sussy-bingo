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

export interface GameState {
  phase: Phase | 'unknown';
  me: MyInfo | null;
  card: string[][] | null;
  players: PlayerSummary[];
  leaderboard: LeaderboardEntry[];
  currentQuote: CurrentQuote | null;
  yourGuess: string | null;
  lastReveal: LastReveal | null;
}

const initial: GameState = {
  phase: 'unknown', me: null, card: null, players: [], leaderboard: [],
  currentQuote: null, yourGuess: null, lastReveal: null,
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
        });
        return;
      case 'host_state':
        this.subject.next({
          ...s, phase: msg.phase, players: msg.players, leaderboard: msg.leaderboard,
          currentQuote: msg.currentQuote, yourGuess: null, lastReveal: null,
        });
        return;
      case 'lobby_update':
        this.subject.next({ ...s, players: msg.players });
        return;
      case 'card_started':
        this.subject.next({ ...s, phase: 'live', leaderboard: msg.leaderboard, currentQuote: null, yourGuess: null, lastReveal: null });
        return;
      case 'your_card':
        this.subject.next({ ...s, card: msg.card });
        return;
      case 'quote':
        this.subject.next({ ...s, currentQuote: { index: msg.index, quote: msg.quote, possibleAnswers: msg.possibleAnswers }, yourGuess: null, lastReveal: null });
        return;
      case 'guess_ack':
        if (s.currentQuote?.index === msg.quoteIndex) {
          this.subject.next({ ...s, yourGuess: msg.guess });
        }
        return;
      case 'guess_rejected':
        if (s.currentQuote?.index === msg.quoteIndex) {
          this.subject.next({ ...s, yourGuess: null });
        }
        return;
      case 'reveal':
        this.subject.next({
          ...s,
          leaderboard: msg.leaderboard,
          lastReveal: { index: msg.index, truth: msg.truth, perPlayer: msg.perPlayer },
          me: s.me ? { ...s.me, score: msg.leaderboard.find(l => l.playerId === s.me!.playerId)?.score ?? s.me.score } : s.me,
        });
        return;
      case 'returned_to_lobby':
        this.subject.next({ ...s, phase: 'lobby', card: null, currentQuote: null, yourGuess: null, lastReveal: null, players: msg.players, leaderboard: [] });
        return;
      case 'pick_rejected':
        console.warn('pick rejected:', msg.reason);
        return;
      case 'error':
        console.error('server error', msg.reason);
        return;
    }
  }
}
