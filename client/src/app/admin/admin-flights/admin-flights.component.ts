import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/flights/flights.service';
import { FlightRecordModel } from 'src/app/shared/models/flightRecordModel';
import { FlightModel } from 'src/app/shared/models/flightsModel';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.sass'],
})
export class AdminFlightsComponent implements OnInit {
  public flightRecords: FlightRecordModel[] = [];
  public isFetching: boolean = false;

  public navigateToRecord(flight: FlightModel) {
    this.router.navigate(['admin', 'flight-record', flight._id]);
  }

  constructor(private flightService: FlightService, private router: Router) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.flightService.getAllRecords().subscribe({
      next: (res: any) => {
        this.flightRecords = res;
        this.isFetching = false;
      },
    });
  }
}
