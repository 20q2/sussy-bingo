import { Component, HostListener, Input, OnChanges } from '@angular/core';

export interface WordCloudDatum {
  text: string;
  value: number;
  count?: number;
}

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements OnChanges {
  @Input() data: WordCloudDatum[] = [];
  @Input() heightOffset = 0;

  width = window.innerWidth;
  height = window.innerHeight - this.heightOffset;

  tooltip: { x: number; y: number; text: string; count: number } | null = null;

  @HostListener('window:resize')
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight - this.heightOffset;
  }

  ngOnChanges() {
    this.height = window.innerHeight - this.heightOffset;
  }

  onWordOver(e: { event: MouseEvent; word: any }) {
    const text = String(e.word.text ?? '');
    const count = Number(e.word.count ?? 0);
    if (!text || !count) return;
    this.tooltip = { x: e.event.clientX, y: e.event.clientY, text, count };
  }

  onWordOut() {
    this.tooltip = null;
  }
}
