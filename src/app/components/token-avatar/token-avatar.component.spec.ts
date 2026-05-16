import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenAvatarComponent } from './token-avatar.component';
import { TokensService } from '../../services/tokens.service';

class FakeTokensService {
  byId(id: string | null) {
    if (id === 'a') return { id: 'a', name: 'Goblin', artist: 'X', artCropUrl: 'http://example/a.jpg' };
    return undefined;
  }
}

describe('TokenAvatarComponent', () => {
  let fixture: ComponentFixture<TokenAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokenAvatarComponent],
      providers: [{ provide: TokensService, useClass: FakeTokensService }],
    }).compileComponents();
    fixture = TestBed.createComponent(TokenAvatarComponent);
  });

  it('renders the token art img when tokenId resolves', () => {
    fixture.componentInstance.tokenId = 'a';
    fixture.detectChanges();
    const img: HTMLImageElement | null = fixture.nativeElement.querySelector('img.avatar-img');
    expect(img).not.toBeNull();
    expect(img!.src).toContain('http://example/a.jpg');
    expect(img!.alt).toBe('Goblin');
  });

  it('renders the silhouette placeholder when tokenId is null', () => {
    fixture.componentInstance.tokenId = null;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img.avatar-img')).toBeNull();
    expect(fixture.nativeElement.querySelector('.avatar-placeholder')).not.toBeNull();
  });

  it('renders the placeholder when tokenId is unknown', () => {
    fixture.componentInstance.tokenId = 'unknown';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img.avatar-img')).toBeNull();
    expect(fixture.nativeElement.querySelector('.avatar-placeholder')).not.toBeNull();
  });

  it('applies the size class', () => {
    fixture.componentInstance.tokenId = 'a';
    fixture.componentInstance.size = 'sm';
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement.querySelector('.avatar');
    expect(root.classList).toContain('size-sm');
  });
});
