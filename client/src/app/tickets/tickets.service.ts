import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketModel } from '../shared/models/ticketModel';

import { url } from '../config/config';

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
    ticketClass?: string,
    priceMin?: string,
    priceMax?: string
  ) {
    const ticketUrl = `${url}/tickets?departure=${departure}&destination=${destination}&departureStart=${departureStart}&departureEnd=${departureEnd}&airline[in]=${airline}${
      ticketClass &&
      `&ticketClass=${ticketClass}${
        priceMin &&
        `&price[gte]=${priceMin}${priceMax && `&price[lte]=${priceMax}`}`
      }`
    }`;
    return this.http.get(`${ticketUrl}`);
  }
}
