import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuoteIngestService } from './quote-ingest.service';

describe('QuoteIngestService', () => {
  let svc: QuoteIngestService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    svc = TestBed.inject(QuoteIngestService);
    http = TestBed.inject(HttpTestingController);
  });

  it('parses quotes and produces weights with collapsed nicknames', async () => {
    const promise = svc.load();
    const req = http.expectOne('assets/ingest_file.txt');
    req.flush(`"hi there" - Andrew\n"yo" - andrew (edited)\n"nope" - Con\n`);
    const result = await promise;
    expect(result.quotes.length).toBe(3);
    const andrew = result.weights.find(w => w.name === 'Andrew');
    expect(andrew?.weight).toBe(2);
    const connor = result.weights.find(w => w.name === 'Connor');
    expect(connor?.weight).toBe(1);
  });

  it('credits all canonical people when an alias is shared (co-attribution)', async () => {
    // "Steven + Andrew and Different Points" is listed under both Andrew and
    // Stephen in nickNameMap. A quote attributed with that alias should bump
    // both people's counts.
    const promise = svc.load();
    const req = http.expectOne('assets/ingest_file.txt');
    req.flush(`"shared one" - Steven + Andrew and Different Points\n"andrew only" - Andrew\n`);
    const result = await promise;
    const andrew = result.weights.find(w => w.name === 'Andrew');
    const stephen = result.weights.find(w => w.name === 'Stephen');
    expect(andrew?.weight).toBe(2);
    expect(stephen?.weight).toBe(1);
  });

  it('keeps both attributed quotes when separated by a timestamp line', async () => {
    // Two valid quotes posted at different points in the night with a Discord
    // timestamp marker on its own line in between. Both should be parsed.
    const promise = svc.load();
    const req = http.expectOne('assets/ingest_file.txt');
    req.flush([
      `"I will then pass my turn without gaining life" -Con (edited)`,
      `[9:09 PM]`,
      `"I'm going to sacrifice the Stimulus Package" -Ship`,
    ].join('\n'));
    const result = await promise;
    expect(result.quotes.length).toBe(2);
    const texts = result.quotes.map(q => q.quote);
    expect(texts).toContain('I will then pass my turn without gaining life');
    expect(texts).toContain("I'm going to sacrifice the Stimulus Package");
  });

  it('filters out multi-line artifacts and keeps the real punchline', async () => {
    // Mirrors the Discord paste-shape the user flagged: a setup quote with a
    // mention, a [timestamp] line, then the real attributed quote on the next line.
    const promise = svc.load();
    const req = http.expectOne('assets/ingest_file.txt');
    req.flush([
      `"Andrew while this song is playing I want you to read the second word in this card without the O" @Liliana Vess`,
      `[8:37 PM]`,
      `"...Kiba" - Andrew (edited)`,
      `""`,
      `"..." - Andrew`,
    ].join('\n'));
    const result = await promise;
    expect(result.quotes.length).toBe(1);
    expect(result.quotes[0].quote).toBe('...Kiba');
  });
});
