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
import { FlightService } from 'src/app/flights/flights.service';
import { ReloadService } from 'src/app/shared/reload/reload.service';

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
    public adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private reloadService: ReloadService
  ) {}

  public handleFlightRecordSubmit() {
    const flightId = this.adminService.activeFlightId;
    const { airline, departureTime, arrivalTime } = this.flightRecordForm.value;
    console.log(departureTime);
    if (this.adminService.editingRecord) {
      this.flightService
        .editFlightRecord(
          this.adminService.editingRecord._id,
          airline,
          departureTime,
          arrivalTime
        )
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (res) => {
            this.adminService.setNotificationMessage('Record updated');
            this.adminService.showNotification();
            this.adminService.isRecordFormShown.next(false);
            this.reloadService.reloadComponent();
          },
        });
      return;
    }

    this.flightService
      .addFlightRecord(flightId, airline, departureTime, arrivalTime)
      .subscribe({
        next: (res) => {
          this.adminService.setNotificationMessage('Flight record created!');
          this.adminService.showNotification();
          this.adminService.isRecordFormShown.next(false);
        },
      });
  }

  ngOnInit(): void {
    if (this.adminService.editingRecord) {
      const { departureTime, arrivalTime } = this.adminService.editingRecord;
      const ind = departureTime.toString().lastIndexOf(':');
      const departureDate = departureTime.toString().slice(0, ind);
      const arrivalDate = arrivalTime.toString().slice(0, ind);

      this.flightRecordForm.patchValue({
        airline: this.adminService.editingRecord.airplaneId.company,
        departureTime: departureDate,
        arrivalTime: arrivalDate,
      });
    }

    this.adminService
      .getAirplanes()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => (this.airplanes = res),
      });
  }
}
