import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketModel } from '../shared/models/ticketModel';
import { url } from '../config/config';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  tickets: TicketModel[] = [];

  constructor(private http: HttpClient) {}

  public getTickets(recordId: string) {
    return this.http.get(`${url}/tickets/${recordId}`).pipe(
      tap((res: any) => {
        this.tickets = res;
      })
    );
  }
}
