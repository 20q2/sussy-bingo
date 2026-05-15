import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WebSocketService } from './web-socket.service';

class FakeSocket {
  static instances: FakeSocket[] = [];
  onopen?: () => void;
  onmessage?: (e: { data: string }) => void;
  onclose?: () => void;
  readyState = 0; // CONNECTING
  sent: string[] = [];
  constructor(public url: string) { FakeSocket.instances.push(this); }
  send(s: string) { this.sent.push(s); }
  close() { this.readyState = 3; this.onclose?.(); }
  open() { this.readyState = 1; this.onopen?.(); }
  message(obj: any) { this.onmessage?.({ data: JSON.stringify(obj) }); }
}

describe('WebSocketService', () => {
  let svc: WebSocketService;

  beforeEach(() => {
    FakeSocket.instances = [];
    (window as any).WebSocket = FakeSocket;
    TestBed.configureTestingModule({});
    svc = TestBed.inject(WebSocketService);
  });

  it('queues messages sent before connect, flushes on open', () => {
    svc.connect('wss://x');
    svc.send({ type: 'host_hello' });
    expect(FakeSocket.instances[0].sent.length).toBe(0);
    FakeSocket.instances[0].open();
    expect(FakeSocket.instances[0].sent.length).toBe(1);
    const payload = JSON.parse(FakeSocket.instances[0].sent[0]);
    expect(payload.action).toBe('msg');
    expect(payload.body.type).toBe('host_hello');
  });

  it('reconnects on close and fires onReconnect hook', fakeAsync(() => {
    let reconnectCount = 0;
    svc.onReconnect = () => { reconnectCount++; };
    svc.connect('wss://x');
    FakeSocket.instances[0].open();
    FakeSocket.instances[0].close();
    tick(300);
    expect(FakeSocket.instances.length).toBe(2);
    FakeSocket.instances[1].open();
    expect(reconnectCount).toBe(1);
  }));
});
