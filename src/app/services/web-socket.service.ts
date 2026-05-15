import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ClientMessage, ServerMessage } from '../models/protocol';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket?: WebSocket;
  private url: string = '';
  private subject = new Subject<ServerMessage>();
  private queue: ClientMessage[] = [];
  private retryMs = 250;
  private readonly retryMaxMs = 4000;
  private intentionallyClosed = false;
  onReconnect?: () => void;
  private isFirstConnect = true;

  connect(url: string): void {
    this.url = url;
    this.intentionallyClosed = false;
    this.open();
  }

  disconnect(): void {
    this.intentionallyClosed = true;
    this.socket?.close();
  }

  send(message: ClientMessage): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ body: message }));
    } else {
      this.queue.push(message);
    }
  }

  get messages$(): Observable<ServerMessage> {
    return this.subject.asObservable();
  }

  private open(): void {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = () => {
      this.retryMs = 250;
      const wasReconnect = !this.isFirstConnect;
      this.isFirstConnect = false;
      while (this.queue.length) {
        this.socket!.send(JSON.stringify({ body: this.queue.shift() }));
      }
      if (wasReconnect && this.onReconnect) this.onReconnect();
    };
    this.socket.onmessage = (e) => {
      try { this.subject.next(JSON.parse(e.data) as ServerMessage); } catch {}
    };
    this.socket.onclose = () => {
      if (this.intentionallyClosed) return;
      const delay = this.retryMs;
      this.retryMs = Math.min(this.retryMs * 2, this.retryMaxMs);
      setTimeout(() => this.open(), delay);
    };
    this.socket.onerror = () => { /* let onclose drive reconnect */ };
  }
}
