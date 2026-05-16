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

  it('filters out multi-line / mention / timestamp artifacts and keeps the real punchline', async () => {
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
