import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokensService, Token } from './tokens.service';

describe('TokensService', () => {
  let svc: TokensService;
  let http: HttpTestingController;

  const fixture: Token[] = [
    { id: 'a', name: 'Goblin', artist: 'X', artCropUrl: 'https://example/a.jpg' },
    { id: 'b', name: 'Squirrel', artist: 'Y', artCropUrl: 'https://example/b.jpg' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    svc = TestBed.inject(TokensService);
    http = TestBed.inject(HttpTestingController);
  });

  it('loads tokens.json and exposes the pool', async () => {
    const promise = svc.load();
    http.expectOne('assets/tokens.json').flush(fixture);
    await promise;
    expect(svc.tokens.length).toBe(2);
    expect(svc.byId('a')?.name).toBe('Goblin');
  });

  it('byId returns undefined for unknown id', async () => {
    const promise = svc.load();
    http.expectOne('assets/tokens.json').flush(fixture);
    await promise;
    expect(svc.byId('nope')).toBeUndefined();
    expect(svc.byId(null)).toBeUndefined();
  });

  it('exposes an empty pool if the fetch fails', async () => {
    const promise = svc.load();
    http.expectOne('assets/tokens.json').error(new ErrorEvent('network'));
    await promise;
    expect(svc.tokens).toEqual([]);
  });
});
