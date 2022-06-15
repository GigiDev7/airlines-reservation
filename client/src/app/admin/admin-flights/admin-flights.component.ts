import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/flights/flights.service';
import { FlightModel } from 'src/app/shared/models/flightsModel';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.sass'],
})
export class AdminFlightsComponent implements OnInit {
  public flights: FlightModel[] = [];

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.flightService.getFlights().subscribe({
      next: (res) => (this.flights = res),
    });
  }
}
