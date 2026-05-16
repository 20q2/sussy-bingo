import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/web-socket.service';
import { GameStateService, GameState } from '../../services/game-state.service';
import { QuoteIngestService, IngestQuote } from '../../services/quote-ingest.service';
import { WS_URL } from '../../config';
import { LeaderboardEntry } from '../../models/protocol';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss'],
  animations: [
    trigger('quoteIn', [
      transition('* => *', [
        query('.quote-index, .big-quote', [
          style({ opacity: 0, transform: 'translateY(14px)' }),
          stagger(90, [
            animate('360ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
        query('.answer-card', [
          style({ opacity: 0, transform: 'translateY(22px) scale(0.9)' }),
          stagger(80, [
            animate('420ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class HostComponent implements OnDestroy, OnInit {
  state: GameState;
  private quotes: IngestQuote[] = [];
  private quotesUsed = new Set<number>();
  private weights: { name: string; weight: number }[] = [];
  private nameRoster: string[] = [];
  private currentTruth: string | null = null;
  private sub = new Subscription();
  ingestReady = false;
  endGameConfirming = false;
  /** Player IDs that scored on the most recent reveal (for +1 badges). */
  recentlyScored = new Set<string>();
  private deltaTimer?: ReturnType<typeof setTimeout>;
  private lastSeenRevealIndex: number | null = null;

  constructor(
    private ws: WebSocketService,
    public game: GameStateService,
    private ingest: QuoteIngestService,
  ) { this.state = game.snapshot(); }

  async ngOnInit(): Promise<void> {
    const result = await this.ingest.load();
    this.quotes = result.quotes;
    this.weights = result.weights;
    this.nameRoster = result.weights.map(w => w.name);
    this.ingestReady = true;

    this.ws.connect(WS_URL);
    this.ws.onReconnect = () => this.ws.send({ type: 'host_hello' });
    this.sub.add(this.ws.messages$.subscribe(msg => this.game.apply(msg)));
    this.sub.add(this.game.state$.subscribe(s => this.onState(s)));
    this.ws.send({ type: 'host_hello' });
  }

  private onState(s: GameState): void {
    this.state = s;
    // When a new reveal arrives, capture which players scored on it
    if (s.lastReveal && s.lastReveal.index !== this.lastSeenRevealIndex) {
      this.lastSeenRevealIndex = s.lastReveal.index;
      this.recentlyScored = new Set(s.lastReveal.perPlayer.filter(p => p.correct).map(p => p.playerId));
      if (this.deltaTimer) clearTimeout(this.deltaTimer);
      this.deltaTimer = setTimeout(() => { this.recentlyScored = new Set(); }, 4500);
    }
  }

  /** Leaderboard with stale duplicate entries collapsed to the best score per name. */
  get displayLeaderboard(): LeaderboardEntry[] {
    const byName = new Map<string, LeaderboardEntry>();
    for (const row of this.state.leaderboard) {
      const existing = byName.get(row.name);
      if (!existing || row.score > existing.score) byName.set(row.name, row);
    }
    return [...byName.values()].sort((a, b) => b.score - a.score);
  }

  /** Per-answer breakdown for the current revealed round. */
  guessersFor(answer: string): { playerId: string; name: string; correct: boolean }[] {
    const reveal = this.state.lastReveal;
    if (!reveal || reveal.index !== this.state.currentQuote?.index) return [];
    return reveal.perPlayer
      .filter(p => p.guess === answer)
      .map(p => ({ playerId: p.playerId, name: p.name, correct: p.correct }));
  }

  /**
   * Prior probability that `answer` is the speaker, given the four candidates
   * on the current quote. Computed from the ingest file's per-person quote
   * counts: weight_i / sum_of_candidate_weights.
   */
  chanceFor(answer: string): number {
    if (!this.state.currentQuote) return 0;
    const weightOf = (n: string) => this.weights.find(w => w.name === n)?.weight ?? 0;
    const total = this.state.currentQuote.possibleAnswers.reduce((sum, c) => sum + weightOf(c), 0);
    if (total === 0) return 0;
    return weightOf(answer) / total;
  }

  get isRevealed(): boolean {
    return !!this.state.lastReveal && this.state.lastReveal.index === this.state.currentQuote?.index;
  }

  get canReveal(): boolean {
    return !!this.state.currentQuote && !this.isRevealed && !!this.currentTruth;
  }

  get canAdvance(): boolean {
    return !this.state.currentQuote || this.isRevealed;
  }

  startCard(): void {
    this.quotesUsed.clear();
    this.currentTruth = null;
    this.lastSeenRevealIndex = null;
    this.recentlyScored = new Set();
    this.ws.send({ type: 'start_card', weights: this.weights });
  }

  newCard(): void { this.startCard(); }

  nextQuote(): void {
    const pick = this.pickUnusedQuote();
    if (!pick) return;
    this.currentTruth = pick.canonicalName;
    const answers = this.buildAnswers(pick.canonicalName);
    this.ws.send({ type: 'next_quote', quote: pick.quote, possibleAnswers: answers });
  }

  reveal(): void {
    if (!this.currentTruth) return;
    this.ws.send({ type: 'reveal', truth: this.currentTruth });
    this.currentTruth = null;
  }

  endGameRequest(): void { this.endGameConfirming = true; }
  endGameCancel(): void { this.endGameConfirming = false; }
  endGameConfirm(): void {
    this.endGameConfirming = false;
    this.ws.send({ type: 'end_game' });
  }

  clearLobbyConfirming = false;
  clearLobbyRequest(): void { this.clearLobbyConfirming = true; }
  clearLobbyCancel(): void { this.clearLobbyConfirming = false; }
  clearLobbyConfirm(): void {
    this.clearLobbyConfirming = false;
    this.ws.send({ type: 'clear_lobby' });
  }

  tokenIdFor(playerId: string): string | null {
    return this.state.players.find(p => p.playerId === playerId)?.tokenId ?? null;
  }

  trackPlayerId(_: number, p: { playerId: string }): string { return p.playerId; }

  private pickUnusedQuote(): IngestQuote | null {
    const remaining = this.quotes.filter((_, i) => !this.quotesUsed.has(i));
    if (!remaining.length) return null;
    const idx = Math.floor(Math.random() * remaining.length);
    const original = this.quotes.indexOf(remaining[idx]);
    this.quotesUsed.add(original);
    return remaining[idx];
  }

  private buildAnswers(truth: string): string[] {
    const pool = this.nameRoster.filter(n => n !== truth);
    const decoys: string[] = [];
    while (decoys.length < 3 && pool.length) {
      const i = Math.floor(Math.random() * pool.length);
      decoys.push(pool.splice(i, 1)[0]);
    }
    return [truth, ...decoys].sort(() => Math.random() - 0.5);
  }

  ngOnDestroy(): void {
    if (this.deltaTimer) clearTimeout(this.deltaTimer);
    this.sub.unsubscribe();
  }
}
