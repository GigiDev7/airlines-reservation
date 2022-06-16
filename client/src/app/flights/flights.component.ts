import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from './flights.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FlightRecordModel } from '../shared/models/flightRecordModel';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.sass'],
})
export class FlightsComponent implements OnInit {
  public flightRecords: FlightRecordModel[] = [];
  public isFetching: boolean = false;

  public handleCheckbox(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      const tobeAddedFlights = this.flightService.flightRecords.filter(
        (flightRecord) => flightRecord.airplaneId.company === target.value
      );
      this.flightRecords = [...this.flightRecords, ...tobeAddedFlights];
    } else if (!target.checked) {
      this.flightRecords = this.flightService.flightRecords.filter(
        (flightRecord) => {
          flightRecord.airplaneId.company !== target.value;
        }
      );
    }
  }

  constructor(
    public flightService: FlightService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.route.queryParams.pipe(tap(() => (this.isFetching = true))).subscribe({
      next: (params) =>
        this.flightService
          .getFilteredRecords(
            params['departure'].toLowerCase(),
            params['destination'].toLowerCase(),
            params['departureStart'],
            params['departureEnd']
          )
          .pipe(untilDestroyed(this))
          .subscribe({
            next: (res) => {
              this.flightRecords = res;
              this.isFetching = false;
            },
          }),
    });
  }
}
