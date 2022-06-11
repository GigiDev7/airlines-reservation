import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { FlightModel } from '../shared/models/flightsModel';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  flights: FlightModel[] = [];

  constructor(private http: HttpClient) {}

  public getFlights(
    departure: string,
    destination: string,
    departureTime: Date
  ): Observable<FlightModel[]> {
    return this.http
      .get(
        `http://localhost:8000/flights?departure=${departure}&destination=${destination}&departureTime=${departureTime}`
      )
      .pipe(
        tap({
          next: (res: any) => (this.flights = res),
        })
      );
  }
}
