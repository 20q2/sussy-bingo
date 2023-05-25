import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Quote {
  name: string,
  quote: string,
  nameVisible: boolean
  index?: number;
}

interface BingoItem {
  text: string,
  clicked: boolean,
  icon?: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fileContents: string = '';
  quotes: Quote[] = [];
  perPerson: {[key: string]: number} = {};
  personKeys: string[] = [];

  compiledPersonTotals: {[key: string]: number} = {};
  compiledKeys: string[] = [];

  bingoCard: BingoItem[][] = [];

  icons = ['forest', 'island', 'mountain', 'plains', 'swamp'];
  iconRoll = 'forest';

  displayedQuotes: Quote[] = [];

  appMode = 'default';

  cardWidth = 5;
  cardHeight = 5;

  clickedBingoSquared: any[] = [];
  clickedBingoSquaredIndex = 0;

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.ingestFile();

  }

  navigateToNextPage() {
    this.router.navigate(['test']);
  }

  ingestFile(): void {
    this.http.get('assets/ingest_file.txt', { responseType: 'text' }).subscribe(data => {
      this.fileContents = data;
      this.regexData();
      this.generateStats();
      this.collapseStats()
    });
  }

  regexData(): void {
    const regex = /([“"][^"“”]+[”"])\s?-(.*)/g;
    const matches = this.fileContents.matchAll(regex);

    if (matches) {
      for (const match of matches) {
        this.quotes.push(
          {
            quote: match[1],
            name: match[2].trim(),
            nameVisible: false
          } as Quote
        );
      }
    }
  }

  generateStats() {
    for (const quote of this.quotes) {
      let name = quote.name;
      name = name.trim();

      if ((name.indexOf('(edited)') === name.length - '(edited)'.length) && name.indexOf('(edited)') !== -1) {
        name = name.substring(0, name.length - '(edited)'.length).trim();
      }

      if (name.indexOf('- ') === 0) {
        name = name.substring(2);
      }

      name = name.toLocaleLowerCase();
      name = name.charAt(0).toLocaleUpperCase() + name.substring(1);
      if (!this.perPerson[name]) {
        this.perPerson[name] = 1;
      } else {
        this.perPerson[name]++;
      }
    }
    this.personKeys = Object.keys(this.perPerson);
  }

  collapseStats(): void  {
    const map: {[key: string]: string[]} = {
      'Connor': ['Cumnor', 'Con', 'Connor'],
      'Andrew': ['Andrew', 'Andrew (me)', 'Golgari king', 'Steven + andrew and different points'],
      'Shipley': ['Shipley', 'Ship, inventor of rubber band', 'Ship', 'Shiply', 'Shipley to steve', 'Shiply, probably'],
      'Tony': ['Tony', 'Tony 2022', 'Tony rat (in response to a banned card)'],
      'Rumtin': ['Rumtin', 'Rumtin?!'],
      'Matty': ['Matty'],
      'Will': ['Will'],
      'Doug': ['Doug'],
      'Stephen': ['Stephen', 'Steven + andrew and different points'],
      'Brandon': ['Brandon']
    }

    const mapKeys = Object.keys(map);

    for (const personKey of this.personKeys) {
      for (const mapKey of mapKeys) {
        if (map[mapKey].includes(personKey)) {
          if (!this.compiledPersonTotals[mapKey]) {
            this.compiledPersonTotals[mapKey] = 0;
          }
          this.compiledPersonTotals[mapKey] += this.perPerson[personKey];
        }
      }
    }

    this.compiledKeys = Object.keys(this.compiledPersonTotals);
  }

  generateCard(): void {
    this.appMode = 'card';

    this.bingoCard = [];
    let totalQuotes = 0;
    const oddsMatrix = [];
    for (const key of Object.keys(this.compiledPersonTotals)) {
      totalQuotes += this.compiledPersonTotals[key];
    }

    for (const key of Object.keys(this.compiledPersonTotals)) {
      const number = this.compiledPersonTotals[key];
      for (let i=0; i < number; i++) {
        oddsMatrix.push(key);
      }      
    }

    for (let i=0; i < this.cardWidth * this.cardHeight; i++) {
      if (!this.bingoCard[Math.floor((i) / this.cardHeight)]) {
        this.bingoCard.push([]);
      }
      const roll = Math.floor(Math.random() * totalQuotes);
      const rolledName = oddsMatrix[roll];

      const row = Math.floor((i) / this.cardHeight);
      const column = i % this.cardWidth;      

      this.bingoCard[row][column] = {
        text: rolledName,
        clicked: false,
      };

    }
    return;
  }

  onItemClick(bingoItem: BingoItem) {
    this.clickedBingoSquaredIndex++;
    this.rollIcon();
    bingoItem.clicked = !bingoItem.clicked;
    bingoItem.icon = this.iconRoll;
    this.clickedBingoSquared.push(
      {
        bingoItem: bingoItem,
        number: this.clickedBingoSquaredIndex
      }
    );
  }

  rollIcon(): void {
    const roll = Math.floor(Math.random() * this.icons.length);
    this.iconRoll = this.icons[roll];
  }

  onClickGenerateQuote(): void {
    this.appMode = 'quote'

    const roll = Math.floor(Math.random() * this.quotes.length);
    if (!this.displayedQuotes.includes(this.quotes[roll])) {
      this.displayedQuotes.unshift(this.quotes[roll]);
      this.displayedQuotes[0].index = this.displayedQuotes.length;
    }    
  }

  onThisOneIsNotOnMyCard(): void {
    this.clickedBingoSquaredIndex++;
    this.clickedBingoSquared.push(
      {
        bingoItem: {
          text: 'I do not know',
          clicked: true
        } as BingoItem,
        number: this.clickedBingoSquaredIndex
      }
    );
  }
}

// grid fr
// color scheme
// svh dvh
// :host-context()