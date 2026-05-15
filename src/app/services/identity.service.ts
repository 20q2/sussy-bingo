import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Identity { playerId: string; name: string; cardId: string; }
const KEY = 'sussy-bingo:identity';

@Injectable({ providedIn: 'root' })
export class IdentityService {
  private subject: BehaviorSubject<Identity | null>;
  readonly identity$;

  constructor() {
    let initial: Identity | null = null;
    try { const raw = localStorage.getItem(KEY); if (raw) initial = JSON.parse(raw); } catch {}
    this.subject = new BehaviorSubject<Identity | null>(initial);
    this.identity$ = this.subject.asObservable();
  }

  snapshot(): Identity | null { return this.subject.value; }

  save(id: Identity): void {
    localStorage.setItem(KEY, JSON.stringify(id));
    this.subject.next(id);
  }

  clear(): void {
    localStorage.removeItem(KEY);
    this.subject.next(null);
  }
}
