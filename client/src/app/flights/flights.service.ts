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
  public flightRecords: FlightRecordModel[] = [];
  public flights: FlightModel[] = [];

  constructor(private http: HttpClient) {}

  public getAllRecords() {
    return this.http.get(`${url}/flight-record`);
  }

  public getFilteredRecords(
    departure: string,
    destination: string,
    departureStart: Date,
    departureEnd: Date
  ): Observable<FlightRecordModel[]> {
    return this.http
      .get(
        `${url}/flight-record?departure=${departure}&destination=${destination}&departureStart=${departureStart}&departureEnd=${departureEnd}`
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
    departureTime: Date,
    arrivalTime: Date
  ) {
    return this.http.post(`${url}/flight-record`, {
      flightId,
      airline,
      departureTime,
      arrivalTime,
    });
  }

  public deleteFlightRecord(recordId: string) {
    return this.http.delete(`${url}/flight-record/${recordId}`);
  }

  public editFlightRecord(
    recordId: string,
    airline: string,
    departureTime: Date,
    arrivalTime: Date
  ) {
    return this.http.patch(`${url}/flight-record/${recordId}`, {
      airline,
      departureTime,
      arrivalTime,
    });
  }

  public getFlights(): Observable<FlightModel[]> {
    return this.http.get(`${url}/flights`).pipe(
      tap({
        next: (res: any) => (this.flights = res),
      })
    );
  }

  public addFlight(departure: string, destination: string) {
    return this.http.post(`${url}/flights`, { departure, destination });
  }

  public deleteFlight(flightId: string) {
    return this.http.delete(`${url}/flights/${flightId}`);
  }

  public editFlight(flightId: string, departure: string, destination: string) {
    return this.http.patch(`${url}/flights/${flightId}`, {
      departure,
      destination,
    });
  }
}
