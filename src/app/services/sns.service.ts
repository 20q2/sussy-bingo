import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnsService {
  private apiUrl = 'https://0idgf2v026.execute-api.us-east-1.amazonaws.com'; // API Gateway URL

  constructor(private http: HttpClient) {}

  subscribeToGame(playerId: string, playerEndpoint: string) {
    const body = { playerId, playerEndpoint };
    return this.http.post(this.apiUrl, body);
  }
}

