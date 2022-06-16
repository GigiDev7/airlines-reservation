import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { FlightModel } from '../shared/models/flightsModel';

import { url } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  public flights: FlightModel[] = [];

  constructor(private http: HttpClient) {}

  public getFlights(
    departure: string = '',
    destination: string = '',
    departureTime: Date | undefined = undefined
  ): Observable<FlightModel[]> {
    return this.http
      .get(
        `${url}/flights?departure=${departure}&destination=${destination}&departureTime=${departureTime}`
      )
      .pipe(
        tap({
          next: (res: any) => (this.flights = res),
        })
      );
  }
}
