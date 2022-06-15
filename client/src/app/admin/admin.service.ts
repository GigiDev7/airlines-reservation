import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AirplaneModel } from '../shared/models/airplaneModel';

import { FlightRecordModel } from '../shared/models/flightRecordModel';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  airplanes: AirplaneModel[] = [];

  constructor(private http: HttpClient) {}

  public getAirplanes() {
    return this.http.get('http://localhost:8000/airplane').pipe(
      tap({
        next: (res: any) => (this.airplanes = res),
      })
    );
  }

  public addFlightRecord(flightRecordData: FlightRecordModel) {
    return this.http.post(
      'http://localhost:8000/flight-record',
      flightRecordData
    );
  }
}
