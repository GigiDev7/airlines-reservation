import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/flights/flights.service';
import { FlightRecordModel } from 'src/app/shared/models/flightRecordModel';
import { FlightModel } from 'src/app/shared/models/flightsModel';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AdminService } from '../admin.service';
import { ReloadService } from 'src/app/shared/reload/reload.service';

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
  public isFlightFormShown: boolean = false;

  public openRecordForm(flightId: string) {
    this.adminService.activeFlightId = flightId;
    this.adminService.isRecordFormShown.next(true);
  }

  public closeRecordForm() {
    this.adminService.isRecordFormShown.next(false);
  }

  public openFlightForm() {
    this.adminService.isFlightFormShown.next(true);
  }

  public closeFlightForm() {
    this.adminService.isFlightFormShown.next(false);
  }

  public handleDeleteFlight(flightId: string) {
    this.flightService.deleteFlight(flightId).subscribe({
      next: () => this.reloadService.reloadComponent(),
    });
  }

  constructor(
    private flightService: FlightService,
    public adminService: AdminService,
    private reloadService: ReloadService
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

    this.adminService.isRecordFormShown.subscribe({
      next: (val) => (this.isRecordFormShown = val),
    });
    this.adminService.isFlightFormShown.subscribe({
      next: (val) => (this.isFlightFormShown = val),
    });
  }
}
