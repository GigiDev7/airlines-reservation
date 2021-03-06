import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { FlightModel } from '../shared/models/flightsModel';

import { url } from '../config/config';
import { FlightRecordModel } from '../shared/models/flightRecordModel';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  public flightRecords: { total: number; records: FlightRecordModel[] } = {
    total: 0,
    records: [],
  };
  public flights: FlightModel[] = [];

  constructor(private http: HttpClient) {}

  public getAllRecords(page: number = 1) {
    return this.http.get(`${url}/flight-record?page=${page}`).pipe(
      tap({
        next: (res: any) => (this.flightRecords = res),
      })
    );
  }

  public getFilteredRecords(
    departure: string,
    destination: string,
    departureStart: Date,
    departureEnd: Date,
    airline: string = ''
  ): Observable<FlightRecordModel[]> {
    return this.http
      .get(
        `${url}/flight-record?departure=${departure}&destination=${destination}&departureStart=${departureStart}&departureEnd=${departureEnd}&airline[in]=${airline}`
      )
      .pipe(
        tap({
          next: (res: any) => (this.flightRecords = res),
        })
      );
  }

  public addFlightRecord(
    flightId: string,
    airline: string,
    flightDays: string[],
    businessTickets: number,
    businessPrice: number,
    standartTickets: number,
    standartPrice: number,
    economTickets: number,
    economPrice: number
  ) {
    return this.http.post(`${url}/flight-record`, {
      flightId,
      airline,
      flightDays,
      tickets: [
        {
          ticketClass: 'business',
          count: businessTickets,
          price: businessPrice,
        },
        {
          ticketClass: 'standart',
          count: standartTickets,
          price: standartPrice,
        },
        { ticketClass: 'econom', count: economTickets, price: economPrice },
      ],
    });
  }

  public deleteFlightRecord(recordId: string) {
    return this.http.delete(`${url}/flight-record/${recordId}`);
  }

  public editFlightRecord(
    recordId: string,
    airline: string,
    flightDay: Date,
    businessTickets: number,
    businessPrice: number,
    standartTickets: number,
    standartPrice: number,
    economTickets: number,
    economPrice: number
  ) {
    return this.http.patch(`${url}/flight-record/${recordId}`, {
      airline,
      flightDay,
      businessTickets,
      businessPrice,
      standartTickets,
      standartPrice,
      economTickets,
      economPrice,
    });
  }

  public getFlights(): Observable<FlightModel[]> {
    return this.http.get(`${url}/flights`).pipe(
      tap({
        next: (res: any) => (this.flights = res),
      })
    );
  }

  public getFilteredFlights(departureCity: string, destinationCity: string) {
    return this.http.get(
      `${url}/flights?departure=${departureCity}&destination=${destinationCity}`
    );
  }

  public addFlight(
    departure: string,
    destination: string,
    departureTime: string,
    arrivalTime: string
  ) {
    return this.http.post(`${url}/flights`, {
      departure,
      destination,
      departureTime,
      arrivalTime,
    });
  }

  public deleteFlight(flightId: string) {
    return this.http.delete(`${url}/flights/${flightId}`);
  }

  public editFlight(
    flightId: string,
    departure: string,
    destination: string,
    departureTime: string,
    arrivalTime: string
  ) {
    return this.http.patch(`${url}/flights/${flightId}`, {
      departure,
      destination,
      departureTime,
      arrivalTime,
    });
  }
}
