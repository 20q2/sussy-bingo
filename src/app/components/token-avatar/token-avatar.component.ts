import { Component, Input } from '@angular/core';
import { TokensService, Token } from '../../services/tokens.service';

@Component({
  selector: 'app-token-avatar',
  templateUrl: './token-avatar.component.html',
  styleUrls: ['./token-avatar.component.scss'],
})
export class TokenAvatarComponent {
  @Input() tokenId: string | null = null;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  constructor(private tokens: TokensService) {}

  get token(): Token | undefined {
    return this.tokens.byId(this.tokenId);
  }
}
