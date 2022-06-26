import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { AirplaneModel } from '../shared/models/airplaneModel';

import { url } from '../config/config';
import { FlightModel } from '../shared/models/flightsModel';
import { FlightRecordModel } from '../shared/models/flightRecordModel';

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
  isTicketFormShown = new Subject<boolean>();
  editingFlight: FlightModel | null = null;
  editingRecord: FlightRecordModel | null = null;

  constructor(private http: HttpClient) {}

  public getAirplanes() {
    return this.http.get(`${url}/airplane`).pipe(
      tap({
        next: (res: any) => (this.airplanes = res),
      })
    );
  }

  public createAirplane(company: string, numberOfSeats: number) {
    return this.http.post(`${url}/airplane`, { company, numberOfSeats });
  }

  public deleteAirplane(airplaneId: string) {
    return this.http.delete(`${url}/airplane/${airplaneId}`);
  }

  public editAirplane(
    airplaneId: string,
    company: string,
    numberOfSeats: number
  ) {
    return this.http.patch(`${url}/airplane/${airplaneId}`, {
      company,
      numberOfSeats,
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
