import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerSummary } from '../../models/protocol';
import { TokensService, Token } from '../../services/tokens.service';

@Component({
  selector: 'app-token-picker',
  templateUrl: './token-picker.component.html',
  styleUrls: ['./token-picker.component.scss'],
})
export class TokenPickerComponent {
  @Input() myPlayerId = '';
  @Input() players: PlayerSummary[] = [];
  @Output() pick = new EventEmitter<string | null>();

  constructor(public tokensSvc: TokensService) {}

  ownerOf(tokenId: string): PlayerSummary | undefined {
    return this.players.find(p => p.tokenId === tokenId);
  }

  isMine(tokenId: string): boolean {
    return this.ownerOf(tokenId)?.playerId === this.myPlayerId;
  }

  isTakenByOther(tokenId: string): boolean {
    const owner = this.ownerOf(tokenId);
    return !!owner && owner.playerId !== this.myPlayerId;
  }

  onTileClick(token: Token): void {
    if (this.isTakenByOther(token.id)) return;
    if (this.isMine(token.id)) this.pick.emit(null);
    else this.pick.emit(token.id);
  }
}
