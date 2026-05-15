import { TestBed } from '@angular/core/testing';
import { IdentityService } from './identity.service';

describe('IdentityService', () => {
  beforeEach(() => { localStorage.clear(); TestBed.configureTestingModule({}); });

  it('returns null when nothing cached', () => {
    const svc = TestBed.inject(IdentityService);
    expect(svc.snapshot()).toBeNull();
  });

  it('persists and reloads identity', () => {
    const svc = TestBed.inject(IdentityService);
    svc.save({ playerId: 'p1', name: 'Andrew', cardId: 'c1' });
    const fresh = TestBed.inject(IdentityService);
    expect(fresh.snapshot()?.playerId).toBe('p1');
  });
});
