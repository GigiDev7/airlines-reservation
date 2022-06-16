import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightModel } from '../shared/models/flightsModel';
import { FlightService } from './flights.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.sass'],
})
export class FlightsComponent implements OnInit {
  public flights: FlightModel[] = [];
  public isFetching: boolean = false;

  public handleCheckbox(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      const tobeAddedFlights = this.flightService.flights.filter(
        (flight) => flight.airplane.company === target.value
      );
      this.flights = [...this.flights, ...tobeAddedFlights];
    } else if (!target.checked) {
      this.flights = this.flightService.flights.filter((flight) => {
        flight.airplane.company !== target.value;
      });
    }
  }

  constructor(
    public flightService: FlightService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.route.queryParams.subscribe({
      next: (params) =>
        this.flightService
          .getFlights(
            params['departure'].toLowerCase(),
            params['destination'].toLowerCase(),
            params['departureTime']
          )
          .pipe(untilDestroyed(this))
          .subscribe({
            next: (res) => {
              this.flights = res;
              this.isFetching = false;
            },
          }),
    });
  }
}
