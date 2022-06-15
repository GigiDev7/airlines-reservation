import { Component, OnInit } from '@angular/core';
import { AirplaneModel } from 'src/app/shared/models/airplaneModel';
import { AdminService } from '../admin.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-flight-record',
  templateUrl: './flight-record.component.html',
  styleUrls: ['./flight-record.component.sass'],
})
export class FlightRecordComponent implements OnInit {
  public airplanes: AirplaneModel[] = [];
  public flightRecordForm: FormGroup = new FormGroup({
    departure: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    airline: new FormControl('', [Validators.required]),
    departureTime: new FormControl('', [Validators.required]),
  });

  constructor(private adminService: AdminService) {}

  public handleFlightRecordSubmit() {
    console.log(this.flightRecordForm.value);
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
