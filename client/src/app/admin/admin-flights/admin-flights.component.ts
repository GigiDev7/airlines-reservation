import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/flights/flights.service';
import { FlightRecordModel } from 'src/app/shared/models/flightRecordModel';
import { FlightModel } from 'src/app/shared/models/flightsModel';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AdminService } from '../admin.service';

@UntilDestroy()
@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.sass'],
})
export class AdminFlightsComponent implements OnInit {
  public flights: FlightModel[] = [];
  public isFetching: boolean = false;
  public isRecordFormShown: boolean = false;

  public openRecordForm(flightId: string) {
    this.isRecordFormShown = true;
    this.adminService.activeFlightId = flightId;
  }

  public closeRecordForm() {
    this.isRecordFormShown = false;
  }

  constructor(
    private flightService: FlightService,
    public adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.flightService
      .getFlights()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.flights = res;
          this.isFetching = false;
        },
      });
  }
}
