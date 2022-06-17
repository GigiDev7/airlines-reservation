import { Component, OnInit } from '@angular/core';
import { AirplaneModel } from 'src/app/shared/models/airplaneModel';
import { AdminService } from '../admin.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-flight-record',
  templateUrl: './flight-record.component.html',
  styleUrls: ['./flight-record.component.sass'],
})
export class FlightRecordComponent implements OnInit {
  public airplanes: AirplaneModel[] = [];
  public flightRecordForm: FormGroup = new FormGroup({
    airline: new FormControl('', [Validators.required]),
    departureTime: new FormControl('', [Validators.required]),
    arrivalTime: new FormControl('', [Validators.required]),
  });

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public handleFlightRecordSubmit() {
    const flightId = this.adminService.activeFlightId;
    const { airline, departureTime, arrivalTime } = this.flightRecordForm.value;
    this.adminService
      .addFlightRecord(flightId, airline, departureTime, arrivalTime)
      .subscribe({
        next: (res) => {
          this.adminService.setNotificationMessage('Flight record created!');
          this.adminService.showNotification();
          this.router.navigate(['admin']);
        },
      });
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
