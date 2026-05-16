import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Token {
  id: string;
  name: string;
  artist: string;
  artCropUrl: string;
}

@Injectable({ providedIn: 'root' })
export class TokensService {
  tokens: Token[] = [];
  private byIdMap = new Map<string, Token>();

  constructor(private http: HttpClient) {}

  async load(): Promise<void> {
    try {
      const list = await firstValueFrom(this.http.get<Token[]>('assets/tokens.json'));
      this.tokens = list ?? [];
    } catch {
      this.tokens = [];
    }
    this.byIdMap.clear();
    for (const t of this.tokens) this.byIdMap.set(t.id, t);
  }

  byId(tokenId: string | null | undefined): Token | undefined {
    if (!tokenId) return undefined;
    return this.byIdMap.get(tokenId);
  }
}
