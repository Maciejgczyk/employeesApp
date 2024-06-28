import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../interfaces/client.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  public baseUrl = 'http://localhost:3000/companies';

  private clientActions = new Subject<any>();
  public reloadClients$ = this.clientActions.asObservable();

  constructor(private http: HttpClient) { }

  reloadClients(): void {
    this.clientActions.next();
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }

  searchClients(value: string = ''): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}?name_like=${value}`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client);
  }

  saveClient(clientId: number, client: Client) {
    return this.http.put<Client>(`${this.baseUrl}/${clientId}`, client);
  }

  deleteClient(clientId: number): Observable<Client> {
    return this.http.delete<Client>(`${this.baseUrl}/${clientId}`);
  }
}
