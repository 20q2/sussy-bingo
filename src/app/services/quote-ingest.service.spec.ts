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
});
