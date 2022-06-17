import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { AirplaneModel } from '../shared/models/airplaneModel';

import { url } from '../config/config';
import { FlightModel } from '../shared/models/flightsModel';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  airplanes: AirplaneModel[] = [];
  activeFlightId: string = '';
  notificationMessage: string = '';
  isNotificationShown: boolean = false;
  isRecordFormShown = new Subject<boolean>();
  isFlightFormShown = new Subject<boolean>();
  editingFlight: FlightModel | null = null;

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

  public setNotificationMessage(message: string) {
    this.notificationMessage = message;
  }

  public showNotification() {
    this.isNotificationShown = true;
    setTimeout(() => {
      this.hideNotification();
    }, 3500);
  }

  public hideNotification() {
    this.isNotificationShown = false;
  }
}
