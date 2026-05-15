import { TestBed } from '@angular/core/testing';
import { GameStateService } from './game-state.service';

describe('GameStateService', () => {
  let svc: GameStateService;
  beforeEach(() => { TestBed.configureTestingModule({}); svc = TestBed.inject(GameStateService); });

  it('applies joined to populate identity-shaped state', () => {
    svc.apply({ type: 'joined', playerId: 'p1', cardId: 'c1', phase: 'lobby', name: 'A', score: 0,
      card: null, currentQuote: null, yourGuess: null, leaderboard: [], players: [{ playerId: 'p1', name: 'A' }] });
    const s = svc.snapshot();
    expect(s.phase).toBe('lobby');
    expect(s.me?.playerId).toBe('p1');
  });

  it('applies quote and clears yourGuess', () => {
    svc.apply({ type: 'joined', playerId: 'p1', cardId: 'c1', phase: 'live', name: 'A', score: 0,
      card: [['x']], currentQuote: null, yourGuess: 'OLD', leaderboard: [], players: [] });
    svc.apply({ type: 'quote', index: 5, quote: 'q', possibleAnswers: ['a','b'] });
    expect(svc.snapshot().currentQuote?.index).toBe(5);
    expect(svc.snapshot().yourGuess).toBeNull();
  });

  it('applies guess_ack to set yourGuess', () => {
    svc.apply({ type: 'quote', index: 5, quote: 'q', possibleAnswers: [] } as any);
    svc.apply({ type: 'guess_ack', quoteIndex: 5, guess: 'Andrew' });
    expect(svc.snapshot().yourGuess).toBe('Andrew');
  });

  it('applies reveal to set leaderboard and mark round revealed', () => {
    svc.apply({ type: 'reveal', index: 5, truth: 'Andrew',
      perPlayer: [{ playerId: 'p1', name: 'A', guess: 'Andrew', correct: true }],
      leaderboard: [{ playerId: 'p1', name: 'A', score: 1 }] });
    expect(svc.snapshot().leaderboard[0].score).toBe(1);
    expect(svc.snapshot().lastReveal?.truth).toBe('Andrew');
  });
});
