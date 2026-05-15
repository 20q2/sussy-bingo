import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/web-socket.service';
import { GameStateService, GameState } from '../../services/game-state.service';
import { QuoteIngestService, IngestQuote } from '../../services/quote-ingest.service';
import { WS_URL } from '../../config';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss'],
})
export class HostComponent implements OnInit, OnDestroy {
  state: GameState;
  private quotes: IngestQuote[] = [];
  private quotesUsed = new Set<number>();
  private weights: { name: string; weight: number }[] = [];
  private nameRoster: string[] = [];
  private currentTruth: string | null = null;
  private sub?: Subscription;
  ingestReady = false;

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
    this.sub = this.ws.messages$.subscribe(msg => this.game.apply(msg));
    this.game.state$.subscribe(s => this.state = s);
    this.ws.send({ type: 'host_hello' });
  }

  startCard(): void {
    this.quotesUsed.clear();
    this.currentTruth = null;
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

  endGame(): void { this.ws.send({ type: 'end_game' }); }

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

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
