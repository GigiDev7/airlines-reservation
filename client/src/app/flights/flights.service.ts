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

  public getFlights(): Observable<FlightModel[]> {
    return this.http.get(`${url}/flights`).pipe(
      tap({
        next: (res: any) => (this.flights = res),
      })
    );
  }

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

  public addFlight(departure: string, destination: string) {
    return this.http.post(`${url}/flights`, { departure, destination });
  }
}
