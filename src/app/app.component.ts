import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';
import { WebSocketService } from './services/web-socket.service';

interface ClickedBingoSquared {
  bingoItem: BingoItem,
  number: number,
  isCorrect: number, // 0 = neutral, 1 = correct, -1 = incorrect
  author?: string,
  myAuthorGuess: string,
  quote: string,

}

interface ServerMessage {
  message: {
    name: string,
    quote: string,
    index: number,
    messageType: 'quote' | 'answer'
    possibleAnswers?: string[]
  }
}

interface Quote {
  name: string,
  quote: string,
  nameVisible: boolean
  index?: number;
  possibleAnswers: string[],  
}

interface BingoItem {
  text: string,
  clicked: boolean,
  icon?: string
  index?: number;
  lockedIn?: boolean;
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

  clickedBingoSquared: ClickedBingoSquared[] = [];
  clickedBingoSquaredIndex = 0;
  lastMarker?: BingoItem = undefined;
  
  currentQuote: string = '';
  currentQuoteIndex?: number;
  currentQuotePossibleAnswers: string[] = [];

  nickNameMap: {[key: string]: string[]} = {
    'Connor': ['Con (edited)', 'Cumnor', 'Connor (edited)', 'Con', 'Connor', 'Connor (irl)', 'connor (irl)', 'Connor (IRL)'],
    'Andrew': ['Andrew', 'Andrew (Me) (edited)', 'Andrew (edited)', 'Andrew (me)', 'Golgari king', 'Steven + andrew and different points', 'Andrew (irl)', 'Andrews', ' andrew', 'andrew', 'Steven + Andrew and Different Points (edited)'],
    'Shipley': ['Shipley to Steve', 'Ship (Text)', 'Shipley', 'Ship, inventor of rubber bands', 'Ship', 'Shiply', 'Shipley to steve', 'Shiply, probably', 'Ship (text)', 'shipley', 'Ship, Inventor of Rubber Bands', '- Ship', 'Ship (edited)'],
    'Tony': ['tony', 'Tony Rat (in response to a banned card) (edited)', 'Tony (edited)', 'Tony', 'Tony 2022', 'Tony rat (in response to a banned card)', '[tony]'],
    'Rumtin': ['Rumtin', 'Rumtin?!', 'Rumtin, in response to a date'],
    'Matty': ['Matty?', 'Matty', 'Matty (edited)'],
    'Will': ['Will'],
    'Doug': ['Doug'],
    'Stephen': ['Stephen', 'Steven + andrew and different points', 'Steven + Andrew and Different Points (edited)'],
    'Brandon': ['Brandon'],
    'John': ['John'],
    'David': ['David']
  };
  noNoWords = ['i', 'im', 'to', 'you', 'the', 'my', 'a', 'this', 'just', 'that', 'is', 'of', 'in', 'and', 'it', 'on', 'have', 'going', 'dont', 'its'];

  constructor(
    private router: Router,
    private http: HttpClient,
    private webSocketService: WebSocketService
    ) { }

  ngOnInit(): void {
    this.ingestFile();
    this.assignBackground();

    const wsUrl = 'wss://3i2b1n43s9.execute-api.us-east-1.amazonaws.com/production/';
    this.webSocketService.connect(wsUrl);

    this.webSocketService.messages$.subscribe((response: ServerMessage) => {
      console.log('Message received:', response);
      if (response.message.messageType === 'quote') {
        this.handleQuoteMessageFromServer(response);
      } else {
        this.handleAnswerMessageFromServer(response);
      }      
    });
  }

  handleQuoteMessageFromServer(response: ServerMessage) {    
    // {
    //   messageType: 'quote',        
    //   quote: string,
    //   index: number  
    // }
    this.currentQuote = response.message.quote;
    this.currentQuoteIndex = response.message.index;
    this.currentQuotePossibleAnswers = response.message.possibleAnswers ?? [];

    if (this.clickedBingoSquared.length + 1 < this.currentQuoteIndex) { 
      this.onThisOneIsNotOnMyCard();
    }    
  }

  handleAnswerMessageFromServer(response: ServerMessage) {
    // {
    //   messageType: 'answer',        
    //   name: quote.name,
    //   index: quote.index
    // }

    const found = this.clickedBingoSquared.find(item => item.number === response.message.index);
    if (found) {
      if (found.myAuthorGuess === response.message.name) {
        found.isCorrect = 1;
      } else {
        found.isCorrect = -1;
        found.bingoItem.clicked = false;
      }
      found.author = response.message.name;
    } else {
      console.error("Somehow the index is missing???");
    }
  }


  returnToDefault() {
    this.appMode = 'default';    
    this.bingoCard = [];    
    this.clickedBingoSquaredIndex = 0;    
    this.displayedQuotes = [];
    this.assignBackground();
  }

  loseMyselfInTheCloud() {
    this.appMode = 'cloud';
    const quotesOnly = this.quotes.map(quote => quote.quote);
    const quoteValues: { [key: string]: number } = {};

    quotesOnly.forEach(item => {
      let words = item
        .split(" ")
        .map(word => word.toLocaleLowerCase().replace(/["',-]/g, ''))
        .filter(word => !this.noNoWords.includes(word));

      words.forEach(word => {
          quoteValues[word] = (quoteValues[word] || 0) + 1;
      });
    });

    // Generate word cloud data only for words that appear more than once
    const wordCloudData: { text: string, value: number }[] = Object.entries(quoteValues)
        .filter(([_, count]) => count > 1) // Include words that appear more than once
        .map(([word, count]) => ({ text: word, value: count * 10 })); // Scale values for cloud

    // Update the word cloud data if it exists
    if (this.wordCloud) {
        this.wordCloud.data = wordCloudData;
    }

    // Update the page container styles
    const pageContainer = document.querySelector('.page-container') as HTMLElement;
    if (pageContainer) {
        pageContainer.style.backgroundImage = 'none';
        pageContainer.style.backgroundColor = 'white';
    }
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
    (document.querySelector('.page-container') as HTMLElement).style.backgroundColor = '#aaa';
  }

  navigateToNextPage() {
    this.router.navigate(['test']);
  }

  ingestFile(): void {
    this.http.get('assets/ingest_file.txt', { responseType: 'text' }).subscribe(data => {
      this.fileContents = data;
      this.regexData();
      this.generateStats();
      this.collapseStats();
    });
  }

  regexData(): void {
    const regex = /([“"][^"“”]+[”"])\s?-(.*)/g;
    const matches = this.fileContents.matchAll(regex);

    if (matches) {
      for (const match of matches) {
        const quote = {
          quote: match[1],
          name: match[2].trim(),
          nameVisible: false
        } as Quote

        if (this.nickNameMapContainsString(quote.name)) {
          this.quotes.push(quote);
        } else {
          console.log("did not add name: ", quote.name);
        }
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
    this.personKeys.sort((a, b) => {
      const aPassesCheck = this.nickNameMapContainsString(a);
      const bPassesCheck = this.nickNameMapContainsString(b);
      if (aPassesCheck && !bPassesCheck) return -1;
      if (!aPassesCheck && bPassesCheck) return 1;
      return 0;
    });  }

    collapseStats(): void {
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
    
      // Get the keys sorted by their totals in descending order
      this.compiledKeys = Object.keys(this.compiledPersonTotals).sort((a, b) => {
        return this.compiledPersonTotals[b] - this.compiledPersonTotals[a];
      });
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
    this.clickedBingoSquaredIndex = 0;    
    this.clickedBingoSquared = [];


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
    if (!bingoItem.clicked) {
      if (this.clickedBingoSquaredIndex + 1 !== this.currentQuoteIndex) {
        console.error("index is out of sync");
        return;
      }

      bingoItem.clicked = true;
      this.clickedBingoSquaredIndex++;
      bingoItem.index = this.clickedBingoSquaredIndex;
      this.rollIcon();
      bingoItem.icon = this.iconRoll;
      bingoItem.lockedIn = false;
      this.clickedBingoSquared.push(
        {
          bingoItem: bingoItem,
          number: this.clickedBingoSquaredIndex,
          isCorrect: 0,
          quote: this.currentQuote,
          myAuthorGuess: bingoItem.text
        } as ClickedBingoSquared
      );
      if (this.lastMarker) {
        this.lastMarker.lockedIn = true;
      }

      this.lastMarker = bingoItem;
    } else {
      if (this.lastMarker === bingoItem && this.currentQuoteIndex === this.clickedBingoSquaredIndex) {
        this.removeMarker(bingoItem);
      }
    }
  }

  removeMarker(bingoItem: BingoItem) {
    this.clickedBingoSquared.pop();
    this.clickedBingoSquaredIndex--;
    bingoItem.index = undefined;
    bingoItem.clicked = false;
  }

  rollIcon(): void {
    const roll = Math.floor(Math.random() * this.icons.length);
    this.iconRoll = this.icons[roll];
  }

  getMasterNameFromNickName(nickName: string) {
    let mappedName;
    for (const key of Object.keys(this.nickNameMap)) {
      const entries = this.nickNameMap[key];
      if (entries.map(nickname => nickname.toLocaleLowerCase()).includes(nickName.toLocaleLowerCase())) {
        mappedName = key;
      }
    }
    return mappedName
  }

  onClickGenerateQuote(): void {
    this.appMode = 'quote'
    
    const roll = Math.floor(Math.random() * this.quotes.length);
    if (!this.displayedQuotes.includes(this.quotes[roll])) {
      this.displayedQuotes.unshift(this.quotes[roll]);
      this.displayedQuotes[0].index = this.displayedQuotes.length;
      
      const allPersonNames = [...Object.keys(this.nickNameMap)];
      console.log(allPersonNames);
      const randomPersonNames = [];
      const mappedName =this.getMasterNameFromNickName(this.displayedQuotes[0].name);
      randomPersonNames.push(mappedName);
  
      let availableNames = [...allPersonNames.filter(name => name !== mappedName)];

      for (let i = 0; i < 3; i++) {
        const roll = Math.floor(Math.random() * availableNames.length);
        randomPersonNames.push(availableNames[roll]);
        availableNames.splice(roll, 1);
      }

      
      randomPersonNames.sort(() => Math.random() - 0.5);

      this.displayedQuotes[0].possibleAnswers = randomPersonNames as any[];
      
      this.webSocketService.sendMessage(
        {
          messageType: 'quote',
          quote: this.displayedQuotes[0].quote,
          index: this.displayedQuotes.length,
          possibleAnswers: this.displayedQuotes[0].possibleAnswers
        }
      );
    }    
  }


  onShowQuoteAuthor(quote: Quote) {
    quote.nameVisible = true;
    
    const mappedName = this.getMasterNameFromNickName(quote.name);

    this.webSocketService.sendMessage(
      {
        messageType: 'answer',        
        name: mappedName,
        index: quote.index
      }
    )
  }

  onThisOneIsNotOnMyCard(): void {
    if (this.clickedBingoSquaredIndex >= (this.currentQuoteIndex ?? 0)) {
      console.error("Cannot go above server index");
      return;
    }
    this.clickedBingoSquaredIndex++;
    this.clickedBingoSquared.push(
      {
        bingoItem: {
          text: 'I dont know/took too long/desync\'d',
          clicked: true,          
        } as BingoItem,
        number: this.clickedBingoSquaredIndex,
        quote: this.currentQuote,
        isCorrect: -1
      } as ClickedBingoSquared
    );
  }
}
