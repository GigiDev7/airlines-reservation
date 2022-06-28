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
  tobeBookedTicket: { flightRecordId: string; ticketClass: string } | null =
    null;
  tobeReturnedTicketId: string | null = null;

  constructor(private http: HttpClient) {}

  public getTickets(
    departure: string,
    destination: string,
    departureStart: Date,
    departureEnd: Date,
    airline: string = '',
    ticketClass: string = '',
    priceMin: string = '',
    priceMax: string = '',
    sort: string = 'flightDay',
    availableTickets: number = 1
  ) {
    const ticketUrl = `${url}/tickets?departure=${departure}&destination=${destination}&departureStart=${departureStart}&departureEnd=${departureEnd}&airline[in]=${airline}&ticketClass=${ticketClass}&price[gte]=${priceMin}&price[lte]=${priceMax}&sort=${sort}&availableTickets=${availableTickets}`;
    return this.http.get(ticketUrl).pipe(
      tap((res: any) => {
        this.tickets = res;
      })
    );
  }

  public getTicketsByUser() {
    return this.http.get(`${url}/tickets/user`);
  }

  public bookTicket(
    flightRecordId: string,
    ticketClass: string,
    numberOfTickets: number,
    firstname: string,
    lastname: string
  ) {
    return this.http.patch(`${url}/tickets/book`, {
      flightRecordId,
      ticketClass,
      numberOfTickets,
      firstname,
      lastname,
    });
  }

  public returnTicket(ticketId: string) {
    return this.http.patch(`${url}/tickets/return/${ticketId}`, {});
  }

  public getTicketsByRecord(flightRecordId: string, page: number = 1) {
    return this.http.get(
      `${url}/tickets/records/${flightRecordId}?page=${page}`
    );
  }

  public updateTicket(ticketId: string, price: number, ticketClass: string) {
    return this.http.patch(`${url}/tickets/${ticketId}`, {
      price,
      ticketClass,
    });
  }
}
