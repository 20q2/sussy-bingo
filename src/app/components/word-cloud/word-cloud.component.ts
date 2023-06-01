import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent {
  data = [
      "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this"].map((word) => {
        return { text: word, value: 10 + Math.random() * 90};
      })
}
