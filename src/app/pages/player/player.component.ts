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
  /** Cell the player tapped for the current open quote, or null if untapped.
   *  Used only for optimistic local feedback before the server echoes the
   *  guess back via `guess_placed`; the source of truth on rejoin is
   *  `state.placements[me.playerId]`. */
  currentPick: { row: number; col: number } | null = null;
  /** Name from the quote's possible-answer chips the player tapped to spotlight on the board. */
  highlightedName: string | null = null;
  /** Number of Reveal power-up charges remaining this session. Resets on reload. */
  revealsRemaining = 2;
  /** True for the duration of the current quote round if the player used a Reveal. */
  revealActive = false;
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

      // Reset transient UI when a fresh card arrives (new game / new round).
      // The green-cells / sticky-tokens history now lives in state.lockedCells,
      // which the GameStateService clears on card_started and rehydrates on
      // joined — no local maps to reset.
      if (s.card !== wasCard) {
        this.currentPick = null;
        this.lastSeenQuoteIndex = null;
      }

      // Clear the pending pick and any highlight when the host moves to a new quote.
      // Also clear the Reveal power-up's per-round effect.
      if (s.currentQuote && s.currentQuote.index !== this.lastSeenQuoteIndex) {
        this.lastSeenQuoteIndex = s.currentQuote.index;
        this.currentPick = null;
        this.highlightedName = null;
        this.revealActive = false;
      }
      // Once the host reveals the answer for the current quote, the Reveal
      // power-up effect is moot (everyone is visible anyway). Clear it so the
      // button can be re-enabled cleanly on the next round without flicker.
      if (s.lastReveal && s.currentQuote && s.lastReveal.index === s.currentQuote.index) {
        this.revealActive = false;
      }
    }));
  }

  submitName(): void {
    if (!this.nameInput.trim()) return;
    this.ws.send({ type: 'join', name: this.nameInput.trim() });
    this.needsName = false;
  }

  onSquareTap(row: number, col: number, name: string): void {
    if (this.state.bingoWinners?.length) return; // game decided — board frozen
    if (!this.state.currentQuote) return;
    if (this.state.lastReveal && this.state.lastReveal.index === this.state.currentQuote.index) return;
    if (this.isLockedForMe(row, col)) return;
    this.currentPick = { row, col };
    this.ws.send({ type: 'guess', quoteIndex: this.state.currentQuote.index, guess: name, row, col });
  }

  private isLockedForMe(row: number, col: number): boolean {
    const meId = this.state.me?.playerId;
    if (!meId) return false;
    const mine = this.state.lockedCells[meId];
    return !!mine && mine.some(([r, c]) => r === row && c === col);
  }

  /** True if I'm one of the bingo co-winners. */
  get amIBingoWinner(): boolean {
    return !!this.state.bingoWinners?.some(w => w.playerId === this.state.me?.playerId);
  }

  /** Cells in my winning line, for grid highlighting. */
  get myWinningLine(): Set<string> {
    const me = this.state.bingoWinners?.find(w => w.playerId === this.state.me?.playerId);
    return new Set((me?.line ?? []).map(([r, c]) => `${r},${c}`));
  }

  isOnWinningLine(row: number, col: number): boolean {
    return this.myWinningLine.has(`${row},${col}`);
  }

  tokenIdFor(playerId: string): string | null {
    return this.state.players.find(p => p.playerId === playerId)?.tokenId ?? null;
  }

  placementsAt(row: number, col: number): Array<{ playerId: string; tokenId: string | null; ox: number; oy: number; rot: number; sticky: boolean }> {
    const out: Array<{ playerId: string; tokenId: string | null; ox: number; oy: number; rot: number; sticky: boolean }> = [];
    const seen = new Set<string>();
    const meId = this.state.me?.playerId ?? null;
    const showOthersLive = this.isRevealed || this.revealActive;
    // Live placements first (full opacity).
    for (const playerId of Object.keys(this.state.placements ?? {})) {
      const pos = this.state.placements[playerId];
      if (pos.row !== row || pos.col !== col) continue;
      if (playerId !== meId && !showOthersLive) continue;
      seen.add(playerId);
      const tokenId = this.state.players.find(p => p.playerId === playerId)?.tokenId ?? null;
      const scatter = this.chipScatter(playerId, row, col);
      out.push({ playerId, tokenId, ...scatter, sticky: false });
    }
    // Sticky chips from past correct rounds (reduced opacity), skipping me
    // (my correct cells show as green squares, not as my own token) and any
    // player who already has a live chip at this cell to avoid double-rendering.
    for (const [playerId, cells] of Object.entries(this.state.lockedCells)) {
      if (playerId === meId) continue;
      if (seen.has(playerId)) continue;
      if (!cells.some(([r, c]) => r === row && c === col)) continue;
      const tokenId = this.state.players.find(p => p.playerId === playerId)?.tokenId ?? null;
      const scatter = this.chipScatter(playerId, row, col);
      out.push({ playerId, tokenId, ...scatter, sticky: true });
    }
    return out;
  }

  /**
   * Deterministic per-(player, cell) scatter so chips land in the same spot on
   * re-render and chips dropped by different players on the same cell don't
   * stack perfectly on top of each other.
   *
   * Polar placement biased to the top/bottom of the cell: chips fall in a
   * 60°-wide arc centered on the vertical axis (top half OR bottom half),
   * leaving the horizontal band clear so the name stays readable.
   */
  private chipScatter(playerId: string, row: number, col: number): { ox: number; oy: number; rot: number } {
    const key = `${playerId}#${row},${col}`;
    let h = 0;
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
    const arcSpan = Math.PI / 3;                                          // 60° wide arc
    const arcPos = (h & 0xff) / 255;                                       // 0..1 within the arc
    const isTop = (((h >> 24) ^ (h >> 30)) & 1) === 0;                     // pick top vs bottom from hash
    // Top arc:    angles -2π/3 .. -π/3  (centered on -π/2 / cell top)
    // Bottom arc: angles  π/3 .. 2π/3   (centered on  π/2 / cell bottom)
    const arcStart = isTop
      ? -Math.PI / 2 - arcSpan / 2
      :  Math.PI / 2 - arcSpan / 2;
    const angle = arcStart + arcPos * arcSpan;
    const radius = 18 + (((h >> 8) & 0xff) / 255) * 6;                     // 18..24 px
    const ox = +(Math.cos(angle) * radius).toFixed(1);
    const oy = +(Math.sin(angle) * radius).toFixed(1);
    const rot = +((((h >> 16) & 0xff) / 255 - 0.5) * 50).toFixed(1);       // -25..+25 deg
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
    return this.isLockedForMe(row, col) ? 'correct' : null;
  }

  isCurrentPick(row: number, col: number): boolean {
    if (this.currentPick?.row === row && this.currentPick?.col === col) return true;
    const meId = this.state.me?.playerId;
    if (!meId) return false;
    const placement = this.state.placements[meId];
    return !!placement && placement.row === row && placement.col === col;
  }

  onChipTap(name: string): void {
    this.highlightedName = this.highlightedName === name ? null : name;
  }

  /** True if the player can currently activate a Reveal: has charges, hasn't
   *  already revealed this round, and the host hasn't already revealed. */
  get canUseReveal(): boolean {
    return this.revealsRemaining > 0
      && !this.revealActive
      && !this.isRevealed
      && this.state.phase === 'live'
      && !this.state.bingoWinners?.length;
  }

  useReveal(): void {
    if (!this.canUseReveal) return;
    this.revealsRemaining--;
    this.revealActive = true;
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
