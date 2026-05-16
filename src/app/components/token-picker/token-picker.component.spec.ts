import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenPickerComponent } from './token-picker.component';
import { TokenAvatarComponent } from '../token-avatar/token-avatar.component';
import { TokensService, Token } from '../../services/tokens.service';

class FakeTokensService {
  tokens: Token[] = [
    { id: 'a', name: 'Goblin',   artist: 'X', artCropUrl: 'http://e/a.jpg' },
    { id: 'b', name: 'Squirrel', artist: 'Y', artCropUrl: 'http://e/b.jpg' },
    { id: 'c', name: 'Spirit',   artist: 'Z', artCropUrl: 'http://e/c.jpg' },
  ];
  byId(id: string | null) { return id ? this.tokens.find(t => t.id === id) : undefined; }
}

describe('TokenPickerComponent', () => {
  let fixture: ComponentFixture<TokenPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokenPickerComponent, TokenAvatarComponent],
      providers: [{ provide: TokensService, useClass: FakeTokensService }],
    }).compileComponents();
    fixture = TestBed.createComponent(TokenPickerComponent);
    fixture.componentInstance.myPlayerId = 'p1';
    fixture.componentInstance.players = [
      { playerId: 'p1', name: 'Alice', tokenId: null },
      { playerId: 'p2', name: 'Bob',   tokenId: 'b' },
    ];
    fixture.detectChanges();
  });

  it('renders one tile per token in the service pool', () => {
    const tiles = fixture.nativeElement.querySelectorAll('.token-tile');
    expect(tiles.length).toBe(3);
  });

  it('marks tokens held by other players as taken (not clickable)', () => {
    const tileB: HTMLElement = fixture.nativeElement.querySelector('[data-token-id="b"]');
    expect(tileB.classList).toContain('taken');
    expect(tileB.classList).not.toContain('mine');
  });

  it('marks the player\'s own token with "mine"', () => {
    fixture.componentInstance.players = [
      { playerId: 'p1', name: 'Alice', tokenId: 'a' },
      { playerId: 'p2', name: 'Bob',   tokenId: 'b' },
    ];
    fixture.detectChanges();
    const tileA: HTMLElement = fixture.nativeElement.querySelector('[data-token-id="a"]');
    expect(tileA.classList).toContain('mine');
  });

  it('emits pick(id) when an available tile is clicked', () => {
    const spy = jasmine.createSpy('pick');
    fixture.componentInstance.pick.subscribe(spy);
    const tileA: HTMLElement = fixture.nativeElement.querySelector('[data-token-id="a"]');
    tileA.click();
    expect(spy).toHaveBeenCalledWith('a');
  });

  it('emits pick(null) when clicking your own currently-picked tile', () => {
    fixture.componentInstance.players = [
      { playerId: 'p1', name: 'Alice', tokenId: 'a' },
    ];
    fixture.detectChanges();
    const spy = jasmine.createSpy('pick');
    fixture.componentInstance.pick.subscribe(spy);
    const tileA: HTMLElement = fixture.nativeElement.querySelector('[data-token-id="a"]');
    tileA.click();
    expect(spy).toHaveBeenCalledWith(null);
  });

  it('does NOT emit pick when clicking a token held by someone else', () => {
    const spy = jasmine.createSpy('pick');
    fixture.componentInstance.pick.subscribe(spy);
    const tileB: HTMLElement = fixture.nativeElement.querySelector('[data-token-id="b"]');
    tileB.click();
    expect(spy).not.toHaveBeenCalled();
  });
});
