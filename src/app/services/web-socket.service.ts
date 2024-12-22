import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket?: WebSocket;
  private subject: Subject<any> = new Subject<any>();

  constructor() {}

  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onmessage = (event) => {
      this.subject.next(JSON.parse(event.data)); // Handle incoming messages
    };

    this.socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    this.socket.onclose = () => {
      console.log('Disconnected from WebSocket');
    };
  }

  sendMessage(message: any): void {
    if (this.socket) {
        console.log("sending message: ", message);
        this.socket.send(JSON.stringify({body: message})); // Send message to server
    }
  }

  get messages$(): Observable<any> {
    return this.subject.asObservable();
  }
}
