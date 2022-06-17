import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/flights/flights.service';
import { FlightRecordModel } from 'src/app/shared/models/flightRecordModel';
import { FlightModel } from 'src/app/shared/models/flightsModel';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.sass'],
})
export class AdminFlightsComponent implements OnInit {
  public flights: FlightModel[] = [];
  public isFetching: boolean = false;

  public navigateToRecord(flightId: string) {
    this.router.navigate(['admin', 'flight-record', flightId]);
  }

  constructor(private flightService: FlightService, private router: Router) {}

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
