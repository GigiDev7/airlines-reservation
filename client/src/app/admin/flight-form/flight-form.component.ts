import { Component, OnInit } from '@angular/core';
import { AirplaneModel } from 'src/app/shared/models/airplaneModel';
import { AdminService } from '../admin.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.sass'],
})
export class FlightFormComponent implements OnInit {
  public airplanes: AirplaneModel[] = [];

  constructor(private adminService: AdminService) {}

  public handleFlightRecordSubmit(e: Event) {
    e.preventDefault();
    console.log('submit');
  }

  public trackBy(index: number, item: AirplaneModel) {
    return item._id;
  }

  ngOnInit(): void {
    this.adminService
      .getAirplanes()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => (this.airplanes = res),
      });
  }
}
