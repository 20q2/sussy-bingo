import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('wordCloud') wordCloud?: WordCloudComponent;
  private readonly noNoWords = new Set([
    'i','im','to','you','the','my','a','this','just','that','is','of','in','and','it','on','have','going','dont','its',
  ]);

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    const text = await firstValueFrom(this.http.get('assets/ingest_file.txt', { responseType: 'text' }));
    const counts: Record<string, number> = {};
    for (const match of text.matchAll(/([""][^"""]+[""])/g)) {
      for (const word of match[1].split(' ')
        .map(w => w.toLocaleLowerCase().replace(/["',-]/g, ''))
        .filter(w => w && !this.noNoWords.has(w))) {
        counts[word] = (counts[word] ?? 0) + 1;
      }
    }
    const data = Object.entries(counts).filter(([, n]) => n > 1).map(([text, n]) => ({ text, value: n * 10 }));
    if (this.wordCloud) this.wordCloud.data = data;
  }
}
