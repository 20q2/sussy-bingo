import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { WordCloudDatum } from '../../components/word-cloud/word-cloud.component';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.scss'],
})
export class CloudComponent implements OnInit {
  data: WordCloudDatum[] = [];

  private readonly noNoWords = new Set([
    'i',"i'm",'im','to','you','the','my','a','this','just','that','is','of','in','and','it','on','have','going','dont','its',
    'so','was','be','for','but','at','if','me','we','are','as','do','or','no','not','your','they','them','he','she',
    'his','her','what','when','where','why','how','can','will','would','could','should','had','has','were','been',
    'with','from','about','out','up','down','an','by','get','got','all','any','some','one','two','there','here',
    'like','know','think','really','yeah','oh','ok','okay','well','its','thats','dont','cant','wont','ill','youre',
  ]);

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    const text = await firstValueFrom(this.http.get('assets/ingest_file.txt', { responseType: 'text' }));
    const counts: Record<string, number> = {};
    for (const match of text.matchAll(/[“"]([^"“”\n]+)[”"]\s?-/g)) {
      for (const word of match[1].split(/\s+/)
        .map(w => w.toLocaleLowerCase().replace(/[^a-z']/g, '').replace(/^'+|'+$/g, ''))
        .filter(w => w && !this.noNoWords.has(w))) {
        counts[word] = (counts[word] ?? 0) + 1;
      }
    }
    this.data = Object.entries(counts)
      .filter(([, n]) => n > 1)
      .map(([text, n]) => ({ text, value: 12 + n * 8, count: n }));
  }
}
