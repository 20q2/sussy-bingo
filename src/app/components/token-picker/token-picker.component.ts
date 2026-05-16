import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerSummary } from '../../models/protocol';
import { TokensService, Token } from '../../services/tokens.service';

@Component({
  selector: 'app-token-picker',
  templateUrl: './token-picker.component.html',
  styleUrls: ['./token-picker.component.scss'],
})
export class TokenPickerComponent implements OnChanges {
  @Input() myPlayerId = '';
  @Input() players: PlayerSummary[] = [];
  @Output() pick = new EventEmitter<string | null>();

  // Optimistic local pick so the spring animation fires immediately
  // on tap instead of waiting for the server's lobby_update echo.
  // `null` = no local override; `''` = locally cleared selection.
  localPickId: string | null = null;

  constructor(public tokensSvc: TokensService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['players']) return;
    // Once the server's view matches our optimistic pick (or we have no
    // pending pick), defer to server state.
    const serverMineId = this.players.find(p => p.playerId === this.myPlayerId)?.tokenId ?? '';
    if (this.localPickId !== null && serverMineId === this.localPickId) {
      this.localPickId = null;
    }
  }

  ownerOf(tokenId: string): PlayerSummary | undefined {
    return this.players.find(p => p.tokenId === tokenId);
  }

  isMine(tokenId: string): boolean {
    if (this.localPickId !== null) return this.localPickId === tokenId;
    return this.ownerOf(tokenId)?.playerId === this.myPlayerId;
  }

  isTakenByOther(tokenId: string): boolean {
    const owner = this.ownerOf(tokenId);
    if (!owner) return false;
    if (owner.playerId === this.myPlayerId) return false;
    // If that other player's slot is the one we just optimistically grabbed,
    // treat it as ours visually until the server resolves.
    if (this.localPickId === tokenId) return false;
    return true;
  }

  onTileClick(token: Token): void {
    if (this.isTakenByOther(token.id)) return;
    if (this.isMine(token.id)) {
      this.localPickId = '';
      this.pick.emit(null);
    } else {
      this.localPickId = token.id;
      this.pick.emit(token.id);
    }
  }
}
