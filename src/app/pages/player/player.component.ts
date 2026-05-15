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
  private sub?: Subscription;

  constructor(
    private ws: WebSocketService,
    private identity: IdentityService,
    public game: GameStateService,
  ) { this.state = game.snapshot(); }

  ngOnInit(): void {
    this.ws.onReconnect = () => this.rejoin();
    this.ws.connect(WS_URL);
    this.sub = this.ws.messages$.subscribe(msg => this.game.apply(msg));
    const cached = this.identity.snapshot();
    if (cached) {
      this.ws.send({ type: 'join', name: cached.name, playerId: cached.playerId });
    } else {
      this.needsName = true;
    }
    this.game.state$.subscribe(s => {
      this.state = s;
      if (s.me && !this.identity.snapshot()) {
        this.identity.save({ playerId: s.me.playerId, name: s.me.name, cardId: s.me.cardId });
      } else if (s.me && this.identity.snapshot()?.cardId !== s.me.cardId) {
        this.identity.save({ playerId: s.me.playerId, name: s.me.name, cardId: s.me.cardId });
      }
    });
  }

  submitName(): void {
    if (!this.nameInput.trim()) return;
    this.ws.send({ type: 'join', name: this.nameInput.trim() });
    this.needsName = false;
  }

  onSquareTap(name: string): void {
    if (!this.state.currentQuote) return;
    this.ws.send({ type: 'guess', quoteIndex: this.state.currentQuote.index, guess: name });
  }

  private rejoin(): void {
    const cached = this.identity.snapshot();
    if (cached) this.ws.send({ type: 'join', name: cached.name, playerId: cached.playerId });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
