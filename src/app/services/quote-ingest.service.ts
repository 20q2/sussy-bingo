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
    // Quote body cannot contain newlines or other quote chars. This stops a single
    // regex match from spanning multiple Discord lines and accidentally capturing
    // timestamps / @mentions / the next message's metadata.
    const regex = /([“"][^"“”\n\r]+[”"])\s?-(.*)/g;
    const quotes: IngestQuote[] = [];
    const totals: Record<string, number> = {};
    for (const m of text.matchAll(regex)) {
      const rawName = m[2].trim();
      const canonicals = this.canonicalizeAll(rawName);
      if (!canonicals.length) continue;
      const cleaned = m[1].replace(/^[“"]+|[”"]+$/g, '').trim();
      if (!this.isPlayableQuote(cleaned)) continue;
      // A shared alias (e.g. "Steven + Andrew and Different Points") credits
      // BOTH people — emit one quote entry per canonical match so each shows
      // up in their corpus count.
      for (const canonical of canonicals) {
        quotes.push({ quote: cleaned, rawName, canonicalName: canonical });
        totals[canonical] = (totals[canonical] ?? 0) + 1;
      }
    }
    const weights = Object.entries(totals)
      .map(([name, weight]) => ({ name, weight }))
      .sort((a, b) => b.weight - a.weight);
    return { quotes, weights };
  }

  /** Defensive post-filter for quotes that survived the regex but read badly on the TV. */
  private isPlayableQuote(quote: string): boolean {
    if (/[\r\n]/.test(quote)) return false;       // multi-line artifact
    if (quote.length < 2 || quote.length > 280) return false;
    if (/^\s*$/.test(quote)) return false;         // pure whitespace
    if (!/[A-Za-z]/.test(quote)) return false;     // no letters (e.g. "...")
    return true;
  }

  /** First-matching canonical, kept for the few call-sites that only need one. */
  canonicalize(rawName: string): string | null {
    return this.canonicalizeAll(rawName)[0] ?? null;
  }

  /** Every canonical name whose alias list contains the given raw name. */
  canonicalizeAll(rawName: string): string[] {
    let name = rawName;
    if (name.endsWith('(edited)')) name = name.slice(0, -'(edited)'.length).trim();
    if (name.startsWith('- ')) name = name.slice(2);
    const lc = name.toLocaleLowerCase();
    const out: string[] = [];
    for (const [canon, aliases] of Object.entries(this.nickNameMap)) {
      if (aliases.some(a => a.toLocaleLowerCase() === lc)) out.push(canon);
    }
    return out;
  }
}
