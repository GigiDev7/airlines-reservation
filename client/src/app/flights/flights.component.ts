import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightModel } from '../shared/models/flightsModel';
import { FlightService } from './flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.sass'],
})
export class FlightsComponent implements OnInit {
  public flights: FlightModel[] = [];
  public isFetching: boolean = false;

  constructor(
    private flightService: FlightService,
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
          .subscribe({
            next: (res) => {
              this.flights = res;
              this.isFetching = false;
            },
          }),
    });
  }
}
