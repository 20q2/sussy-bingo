import { Component, OnInit } from '@angular/core';
import { QuoteIngestService, IngestQuote } from '../../services/quote-ingest.service';

interface PersonStat {
  canonical: string;
  count: number;
  percent: number;
  aliases: string[];
  sampleQuotes: string[];
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  loading = true;
  totalQuotes = 0;
  totalRawQuotes = 0;          // matched by regex before isPlayableQuote
  filteredOut = 0;             // captured by regex but dropped by isPlayableQuote
  rejectedUnknownAuthor = 0;   // regex matched but the author didn't resolve
  people: PersonStat[] = [];
  rawTextLength = 0;

  constructor(private ingest: QuoteIngestService) {}

  async ngOnInit(): Promise<void> {
    // We re-run the parse here with extra instrumentation so the page can show
    // not just the kept quotes but also how many were rejected and why.
    const text = await (await fetch('assets/ingest_file.txt')).text();
    this.rawTextLength = text.length;

    const regex = /([“"][^"“”\n\r]+[”"])\s?-(.*)/g;
    const matches = [...text.matchAll(regex)];
    this.totalRawQuotes = matches.length;

    const kept: IngestQuote[] = [];
    for (const m of matches) {
      const rawName = m[2].trim();
      const canonical = this.ingest.canonicalize(rawName);
      if (!canonical) { this.rejectedUnknownAuthor++; continue; }
      const cleaned = m[1].replace(/^[“"]+|[”"]+$/g, '').trim();
      if (!this.isPlayable(cleaned)) { this.filteredOut++; continue; }
      kept.push({ quote: cleaned, rawName, canonicalName: canonical });
    }
    this.totalQuotes = kept.length;

    // Group by canonical name
    const byCanon = new Map<string, IngestQuote[]>();
    for (const q of kept) {
      const arr = byCanon.get(q.canonicalName) ?? [];
      arr.push(q);
      byCanon.set(q.canonicalName, arr);
    }

    // Build the per-person stat rows
    this.people = [...byCanon.entries()]
      .map(([canonical, qs]) => ({
        canonical,
        count: qs.length,
        percent: kept.length ? qs.length / kept.length : 0,
        aliases: this.ingest.nickNameMap[canonical] ?? [],
        sampleQuotes: qs.slice(0, 3).map(q => q.quote),
      }))
      .sort((a, b) => b.count - a.count);

    this.loading = false;
  }

  private isPlayable(quote: string): boolean {
    if (/[\r\n]/.test(quote)) return false;
    if (quote.length < 2 || quote.length > 280) return false;
    if (/^\s*$/.test(quote)) return false;
    if (!/[A-Za-z]/.test(quote)) return false;
    return true;
  }
}
