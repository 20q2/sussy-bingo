import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IdentityService } from '../../services/identity.service';
import { WebSocketService } from '../../services/web-socket.service';
import { GameStateService, GameState } from '../../services/game-state.service';
import { WS_URL } from '../../config';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  state: GameState;
  needsName = false;
  nameInput = '';
  backgroundUrl = '';
  /** Cell the player tapped for the current open quote, or null if untapped. */
  currentPick: { row: number; col: number } | null = null;
  /** Permanent per-cell outcome history keyed by "r,c". */
  cellMarks = new Map<string, 'correct' | 'incorrect'>();
  /** Name from the quote's possible-answer chips the player tapped to spotlight on the board. */
  highlightedName: string | null = null;
  private lastSeenRevealIndex: number | null = null;
  private lastSeenQuoteIndex: number | null = null;
  private sub = new Subscription();
  private static readonly LANDS = ['forest', 'island', 'mountain', 'plains', 'swamp'];

  constructor(
    private ws: WebSocketService,
    private identity: IdentityService,
    public game: GameStateService,
  ) { this.state = game.snapshot(); }

  get myTokenId(): string | null {
    const meId = this.state.me?.playerId;
    if (!meId) return null;
    return this.state.players.find(p => p.playerId === meId)?.tokenId ?? null;
  }

  /** True once the host has revealed the answer to the currently displayed quote. */
  get isRevealed(): boolean {
    const r = this.state.lastReveal;
    return !!r && r.index === this.state.currentQuote?.index;
  }

  ngOnInit(): void {
    this.backgroundUrl = this.pickBackground();
    this.ws.onReconnect = () => this.rejoin();
    this.ws.connect(WS_URL);
    this.sub.add(this.ws.messages$.subscribe(msg => this.game.apply(msg)));
    const cached = this.identity.snapshot();
    if (cached) {
      this.ws.send({ type: 'join', name: cached.name, playerId: cached.playerId });
    } else {
      this.needsName = true;
    }
    this.sub.add(this.game.state$.subscribe(s => {
      const wasMe = this.state.me;
      const wasCard = this.state.card;
      this.state = s;
      if (s.me && !this.identity.snapshot()) {
        this.identity.save({ playerId: s.me.playerId, name: s.me.name, cardId: s.me.cardId });
      } else if (s.me && this.identity.snapshot()?.cardId !== s.me.cardId) {
        this.identity.save({ playerId: s.me.playerId, name: s.me.name, cardId: s.me.cardId });
      } else if (wasMe && !s.me) {
        // Host cleared the lobby. Force the player back to the name-entry screen.
        this.identity.clear();
        this.needsName = true;
        this.nameInput = '';
      }

      // Reset cell marks whenever a fresh card arrives (new game / new round).
      if (s.card !== wasCard) {
        this.cellMarks.clear();
        this.currentPick = null;
        this.lastSeenQuoteIndex = null;
        this.lastSeenRevealIndex = null;
      }

      // Clear the pending pick and any highlight when the host moves to a new quote.
      if (s.currentQuote && s.currentQuote.index !== this.lastSeenQuoteIndex) {
        this.lastSeenQuoteIndex = s.currentQuote.index;
        this.currentPick = null;
        this.highlightedName = null;
      }

      // On a fresh reveal, freeze the current pick into a permanent mark.
      if (s.lastReveal && s.lastReveal.index !== this.lastSeenRevealIndex) {
        this.lastSeenRevealIndex = s.lastReveal.index;
        if (this.currentPick && s.card) {
          const pickedName = s.card[this.currentPick.row]?.[this.currentPick.col];
          const correct = pickedName === s.lastReveal.truth;
          this.cellMarks.set(
            `${this.currentPick.row},${this.currentPick.col}`,
            correct ? 'correct' : 'incorrect',
          );
        }
      }
    }));
  }

  submitName(): void {
    if (!this.nameInput.trim()) return;
    this.ws.send({ type: 'join', name: this.nameInput.trim() });
    this.needsName = false;
  }

  onSquareTap(row: number, col: number, name: string): void {
    if (!this.state.currentQuote) return;
    if (this.state.lastReveal && this.state.lastReveal.index === this.state.currentQuote.index) return;
    if (this.cellMarks.has(`${row},${col}`)) return;
    this.currentPick = { row, col };
    this.ws.send({ type: 'guess', quoteIndex: this.state.currentQuote.index, guess: name, row, col });
  }

  placementsAt(row: number, col: number): Array<{ playerId: string; tokenId: string | null; ox: number; oy: number; rot: number }> {
    const out: Array<{ playerId: string; tokenId: string | null; ox: number; oy: number; rot: number }> = [];
    for (const playerId of Object.keys(this.state.placements ?? {})) {
      const pos = this.state.placements[playerId];
      if (pos.row !== row || pos.col !== col) continue;
      const tokenId = this.state.players.find(p => p.playerId === playerId)?.tokenId ?? null;
      const scatter = this.chipScatter(playerId, row, col);
      out.push({ playerId, tokenId, ...scatter });
    }
    return out;
  }

  /**
   * Deterministic per-(player, cell) scatter so chips land in the same spot on
   * re-render and chips dropped by different players on the same cell don't
   * stack perfectly on top of each other.
   *
   * Polar placement: chips always sit on a ring 16-22px from cell center so
   * the name underneath stays readable.
   */
  private chipScatter(playerId: string, row: number, col: number): { ox: number; oy: number; rot: number } {
    const key = `${playerId}#${row},${col}`;
    let h = 0;
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
    const angle = ((h & 0xff) / 255) * Math.PI * 2;
    const radius = 16 + (((h >> 8) & 0xff) / 255) * 6;     // 16..22 px
    const ox = +(Math.cos(angle) * radius).toFixed(1);
    const oy = +(Math.sin(angle) * radius).toFixed(1);
    const rot = +((((h >> 16) & 0xff) / 255 - 0.5) * 50).toFixed(1); // -25..+25 deg
    return { ox, oy, rot };
  }

  trackPlacement(_: number, p: { playerId: string }): string { return p.playerId; }

  trackQuoteIndex(_: number, q: { index: number }): number { return q.index; }

  /** True if the cell's name is one of the current quote's four possible answers. */
  isAvailable(name: string): boolean {
    const possible = this.state.currentQuote?.possibleAnswers;
    if (!possible) return true;
    return possible.includes(name);
  }

  markFor(row: number, col: number): 'correct' | 'incorrect' | null {
    return this.cellMarks.get(`${row},${col}`) ?? null;
  }

  isCurrentPick(row: number, col: number): boolean {
    return this.currentPick?.row === row && this.currentPick?.col === col;
  }

  onChipTap(name: string): void {
    this.highlightedName = this.highlightedName === name ? null : name;
  }

  onPickToken(tokenId: string | null): void {
    this.ws.send({ type: 'pick_token', tokenId });
  }

  trackPlayerId(_: number, p: { playerId: string }): string { return p.playerId; }

  private rejoin(): void {
    const cached = this.identity.snapshot();
    if (cached) this.ws.send({ type: 'join', name: cached.name, playerId: cached.playerId });
  }

  private pickBackground(): string {
    const roll = Math.floor(Math.random() * 21);
    const name = roll === 20 ? 'wastes' : PlayerComponent.LANDS[roll % PlayerComponent.LANDS.length];
    return `assets/backgrounds/${name}.png`;
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }
}
