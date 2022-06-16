import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AirplaneModel } from '../shared/models/airplaneModel';

import { url } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  airplanes: AirplaneModel[] = [];

  constructor(private http: HttpClient) {}

  public getAirplanes() {
    return this.http.get(`${url}/airplane`).pipe(
      tap({
        next: (res: any) => (this.airplanes = res),
      })
    );
  }

  public addFlightRecord(
    flightId: string,
    airline: string,
    departureTime: Date
  ) {
    return this.http.post(`${url}/flight-record`, {
      flightId,
      airline,
      departureTime,
    });
  }
}
