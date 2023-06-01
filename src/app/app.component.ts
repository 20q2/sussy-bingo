import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';

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
  index?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('wordCloud')
  wordCloud?: WordCloudComponent;
  
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

  nickNameMap: {[key: string]: string[]} = {};
  noNoWords = ['i', 'im', 'to', 'you', 'the', 'my', 'a'];

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.ingestFile();
    this.assignBackground();

  }

  loseMyselfInTheCloud() {
    this.appMode = 'cloud';
    let quotesOnly = this.quotes.map(quote => quote.quote);
    const quoteValues: {[key: string]: number} = {};

    quotesOnly.forEach(item => {
      let array = item.split(" ").map(word => word.toLocaleLowerCase());
      array = array.map(item => item.replace(/["',-]/g, ''));
      array = array.filter(item => !this.noNoWords.includes(item));

      array.forEach(arrayVal => {
        if (quoteValues) {
          if (!quoteValues[arrayVal]) {
            quoteValues[arrayVal] = 1;
          } else {
            quoteValues[arrayVal]++;
          }
        }
      });      
    });

    const quoteKeys = Object.keys(quoteValues);
    const wordCloudData: {text: string, value: number}[] = [];
    quoteKeys.forEach(key => {
      if (quoteValues[key] !== 1) {
        wordCloudData.push({text: key, value: quoteValues[key] * 10});
      }
    })        

    if (this.wordCloud) {
      this.wordCloud.data = wordCloudData;
    }
    (document.querySelector('.page-container') as HTMLElement).style.backgroundImage = `none`;
    (document.querySelector('.page-container') as HTMLElement).style.backgroundColor = `white`;
  }

  assignBackground(): void {
    let roll = Math.floor(Math.random() * 21);
    let imagepath = '';
    if (roll === 20) {
      imagepath = `assets/backgrounds/wastes.png`;
    } else {
      roll = roll % 5;
      imagepath = `assets/backgrounds/${this.icons[roll]}.png`;
    }
    (document.querySelector('.page-container') as HTMLElement).style.backgroundImage = `url(${imagepath})`;
    (document.querySelector('.page-container') as HTMLElement).style.backgroundSize = 'cover';
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
    this.nickNameMap = {
      'Connor': ['Cumnor', 'Con', 'Connor'],
      'Andrew': ['Andrew', 'Andrew (me)', 'Golgari king', 'Steven + andrew and different points'],
      'Shipley': ['Shipley', 'Ship, inventor of rubber bands', 'Ship', 'Shiply', 'Shipley to steve', 'Shiply, probably'],
      'Tony': ['Tony', 'Tony 2022', 'Tony rat (in response to a banned card)', '[tony]'],
      'Rumtin': ['Rumtin', 'Rumtin?!'],
      'Matty': ['Matty'],
      'Will': ['Will'],
      'Doug': ['Doug'],
      'Stephen': ['Stephen', 'Steven + andrew and different points'],
      'Brandon': ['Brandon']
    }

    const nickNameKeys = Object.keys(this.nickNameMap);

    for (const personKey of this.personKeys) {
      for (const mapKey of nickNameKeys) {
        if (this.nickNameMap[mapKey].map(nickname => nickname.toLocaleLowerCase()).includes(personKey.toLocaleLowerCase())) {
          if (!this.compiledPersonTotals[mapKey]) {
            this.compiledPersonTotals[mapKey] = 0;
          }
          this.compiledPersonTotals[mapKey] += this.perPerson[personKey];
        }
      }
    }

    this.compiledKeys = Object.keys(this.compiledPersonTotals);
  }

  nickNameMapContainsString(incoming: string) {
    for(let key of Object.keys(this.nickNameMap)) {
      if (this.nickNameMap[key].includes(incoming)) {
        return true;
      }
    }
    return false;
  }

  generateCard(): void {
    this.appMode = 'card';

    this.bingoCard = [];
    let totalQuotes = 0;
    const oddsMatrix = [];

    // Gather up the total number of quotes to build a loot table
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
    bingoItem.clicked = !bingoItem.clicked;

    if (bingoItem.clicked) {
      this.clickedBingoSquaredIndex++;
      bingoItem.index = this.clickedBingoSquaredIndex;
      this.rollIcon();
      bingoItem.icon = this.iconRoll;
      this.clickedBingoSquared.push(
        {
          bingoItem: bingoItem,
          number: this.clickedBingoSquaredIndex
        }
      );
    }
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