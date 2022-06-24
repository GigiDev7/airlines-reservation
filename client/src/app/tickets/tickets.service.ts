import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketModel } from '../shared/models/ticketModel';

import { url } from '../config/config';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  tickets: TicketModel[] = [];

  constructor(private http: HttpClient) {}

  public getTickets(
    departure: string,
    destination: string,
    departureStart: Date,
    departureEnd: Date,
    airline: string = '',
    ticketClass: string = '',
    priceMin: string = '',
    priceMax: string = ''
  ) {
    const ticketUrl = `${url}/tickets?departure=${departure}&destination=${destination}&departureStart=${departureStart}&departureEnd=${departureEnd}&airline[in]=${airline}&ticketClass=${ticketClass}&price[gte]=${priceMin}&price[lte]=${priceMax}`;
    return this.http.get(ticketUrl).pipe(
      tap((res: any) => {
        this.tickets = res;
      })
    );
  }

  public getTicketByUser() {
    return this.http.get(`${url}/tickets/user`);
  }

  public bookTicket(flightRecordId: string, ticketClass: string) {
    return this.http.patch(`${url}/tickets/book`, {
      flightRecordId,
      ticketClass,
    });
  }
}