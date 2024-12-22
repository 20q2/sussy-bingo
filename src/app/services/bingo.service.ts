import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Quote {
  name: string;
  quote: string;
  nameVisible: boolean;
  index?: number;
}

interface BingoItem {
  text: string;
  clicked: boolean;
  icon?: string;
  index?: number;
  lockedIn?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BingoService {

  fileContents: string = '';
  quotes: Quote[] = [];
  perPerson: { [key: string]: number } = {};
  personKeys: string[] = [];

  compiledPersonTotals: { [key: string]: number } = {};
  compiledKeys: string[] = [];

  icons = ['forest', 'island', 'mountain', 'plains', 'swamp'];
  iconRoll = 'forest';
  
  noNoWords = ['i', 'im', 'to', 'you', 'the', 'my', 'a', 'this', 'just', 'that', 'is', 'of', 'in', 'and', 'it', 'on', 'have', 'going', 'dont', 'its'];

  constructor(private http: HttpClient) { }

  ingestFile(): Observable<string> {
    return this.http.get('assets/ingest_file.txt', { responseType: 'text' });
  }

  regexData(fileContents: string): Quote[] {
    const regex = /([“"][^"“”]+[”"])\s?-(.*)/g;
    const matches = fileContents.matchAll(regex);
    const quotes: Quote[] = [];

    if (matches) {
      for (const match of matches) {
        quotes.push({
          quote: match[1],
          name: match[2].trim(),
          nameVisible: false
        });
      }
    }
    return quotes;
  }

  generateStats(quotes: Quote[]): { [key: string]: number } {
    const perPerson: { [key: string]: number } = {};

    quotes.forEach(quote => {
      let name = quote.name.trim();

      if ((name.indexOf('(edited)') === name.length - '(edited)'.length) && name.indexOf('(edited)') !== -1) {
        name = name.substring(0, name.length - '(edited)'.length).trim();
      }

      if (name.indexOf('- ') === 0) {
        name = name.substring(2);
      }

      name = name.toLocaleLowerCase();
      name = name.charAt(0).toLocaleUpperCase() + name.substring(1);
      
      if (!perPerson[name]) {
        perPerson[name] = 1;
      } else {
        perPerson[name]++;
      }
    });

    return perPerson;
  }

  collapseStats(perPerson: { [key: string]: number }): { [key: string]: number } {
    const nickNameMap = {
      'Connor': ['Cumnor', 'Con', 'Connor', 'Connor (irl)'],
      'Andrew': ['Andrew', 'Andrew (me)', 'Golgari king', 'Steven + andrew and different points', 'Andrew (irl)', 'Andrews'],
      'Shipley': ['Shipley', 'Ship, inventor of rubber bands', 'Ship', 'Shiply', 'Shipley to steve', 'Shiply, probably', 'Ship (text)'],
      'Tony': ['Tony', 'Tony 2022', 'Tony rat (in response to a banned card)', '[tony]'],
      'Rumtin': ['Rumtin', 'Rumtin?!'],
      'Matty': ['Matty'],
      'Will': ['Will'],
      'Doug': ['Doug'],
      'Stephen': ['Stephen', 'Steven + andrew and different points'],
      'Brandon': ['Brandon'],
      'John': ['John'],
      'David': ['David']
    };

    const compiledPersonTotals: { [key: string]: number } = {};

    Object.keys(perPerson).forEach(personKey => {
      for (let mapKey of Object.keys(nickNameMap)) {
        if ((nickNameMap as any)[mapKey].map((nickname: any) => nickname.toLocaleLowerCase()).includes(personKey.toLocaleLowerCase())) {
          if (!compiledPersonTotals[mapKey]) {
            compiledPersonTotals[mapKey] = 0;
          }
          compiledPersonTotals[mapKey] += perPerson[personKey];
        }
      }
    });

    return compiledPersonTotals;
  }

  generateCard(compiledPersonTotals: { [key: string]: number }, cardWidth: number, cardHeight: number): BingoItem[][] {
    const bingoCard: BingoItem[][] = [];
    let totalQuotes = 0;
    const oddsMatrix: string[] = [];

    Object.keys(compiledPersonTotals).forEach(key => {
      totalQuotes += compiledPersonTotals[key];
    });

    Object.keys(compiledPersonTotals).forEach(key => {
      const number = compiledPersonTotals[key];
      for (let i = 0; i < number; i++) {
        oddsMatrix.push(key);
      }
    });

    for (let i = 0; i < cardWidth * cardHeight; i++) {
      if (!bingoCard[Math.floor(i / cardHeight)]) {
        bingoCard.push([]);
      }
      const roll = Math.floor(Math.random() * totalQuotes);
      const rolledName = oddsMatrix[roll];

      const row = Math.floor(i / cardHeight);
      const column = i % cardWidth;

      bingoCard[row][column] = {
        text: rolledName,
        clicked: false,
      };
    }

    return bingoCard;
  }

  rollIcon(): string {
    const roll = Math.floor(Math.random() * this.icons.length);
    return this.icons[roll];
  }
}
