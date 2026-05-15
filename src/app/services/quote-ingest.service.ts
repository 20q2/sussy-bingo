import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface IngestQuote { quote: string; rawName: string; canonicalName: string; }
export interface IngestResult { quotes: IngestQuote[]; weights: { name: string; weight: number }[]; }

@Injectable({ providedIn: 'root' })
export class QuoteIngestService {
  readonly nickNameMap: Record<string, string[]> = {
    'Connor': ['Con (edited)', 'Cumnor', 'Connor (edited)', 'Con', 'Connor'],
    'Andrew': ['Andrew', 'Andrew (Me) (edited)', 'Andrew (edited)', 'Andrew (me)', 'Golgari king', 'Steven + andrew and different points', 'Andrews', ' andrew', 'andrew', 'Steven + Andrew and Different Points (edited)'],
    'Shipley': ['Shipley to Steve', 'Ship (Text)', 'Shipley', 'Ship, inventor of rubber bands', 'Ship', 'Shiply', 'Shipley to steve', 'Shiply, probably', 'Ship (text)', 'shipley', 'Ship, Inventor of Rubber Bands', '- Ship', 'Ship (edited)'],
    'Tony': ['tony', 'Tony Rat (in response to a banned card) (edited)', 'Tony (edited)', 'Tony', 'Tony 2022', 'Tony rat (in response to a banned card)', '[tony]'],
    'Rumtin': ['Rumtin', 'Rumtin?!', 'Rumtin, in response to a date', 'Krockacondor', 'Rumtin (completely umprompted after the longest sweatest game)e'],
    'Matty': ['Matty?', 'Matty', 'Matty (edited)'],
    'Will': ['Will', 'Will (off books)'],
    'Doug': ['Doug', 'Doug (late night)'],
    'Stephen': ['Stephen', 'Steven + andrew and different points', 'Steven + Andrew and Different Points (edited)'],
    'Brandon': ['Brandon'], 'John': ['John'], 'David': ['David'], 'Daffy': ['Daffy'],
  };

  constructor(private http: HttpClient) {}

  async load(): Promise<IngestResult> {
    const text = await firstValueFrom(this.http.get('assets/ingest_file.txt', { responseType: 'text' }));
    return this.parse(text);
  }

  parse(text: string): IngestResult {
    const regex = /([""][^"""]+[""])\s?-(.*)/g;
    const quotes: IngestQuote[] = [];
    const totals: Record<string, number> = {};
    for (const m of text.matchAll(regex)) {
      const rawName = m[2].trim();
      const canonical = this.canonicalize(rawName);
      if (!canonical) continue;
      quotes.push({ quote: m[1], rawName, canonicalName: canonical });
      totals[canonical] = (totals[canonical] ?? 0) + 1;
    }
    const weights = Object.entries(totals)
      .map(([name, weight]) => ({ name, weight }))
      .sort((a, b) => b.weight - a.weight);
    return { quotes, weights };
  }

  canonicalize(rawName: string): string | null {
    let name = rawName;
    if (name.endsWith('(edited)')) name = name.slice(0, -'(edited)'.length).trim();
    if (name.startsWith('- ')) name = name.slice(2);
    const lc = name.toLocaleLowerCase();
    for (const [canon, aliases] of Object.entries(this.nickNameMap)) {
      if (aliases.some(a => a.toLocaleLowerCase() === lc)) return canon;
    }
    return null;
  }
}
