import { Component, OnInit } from '@angular/core';
import { AirplaneModel } from 'src/app/shared/models/airplaneModel';
import { AdminService } from '../admin.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from 'src/app/flights/flights.service';
import { ReloadService } from 'src/app/shared/reload/reload.service';

@UntilDestroy()
@Component({
  selector: 'app-flight-record',
  templateUrl: './flight-record.component.html',
  styleUrls: ['./flight-record.component.sass'],
})
export class FlightRecordComponent implements OnInit {
  public minDate!: string;
  public airplanes: AirplaneModel[] = [];
  public flightRecordForm: FormGroup = new FormGroup({
    airline: new FormControl('', [Validators.required]),
    flightDay: new FormControl('', [Validators.required]),
  });

  public departureTimes: string[] = [];

  constructor(
    public adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private reloadService: ReloadService
  ) {}

  public handleAddDay(e: Event) {
    const target = e.target as HTMLInputElement;
    if (this.departureTimes.includes(target.value)) return;
    this.departureTimes.push(target.value);
  }

  public handleRemoveDay(day: string) {
    this.departureTimes = this.departureTimes.filter(
      (departureDay) => departureDay !== day
    );
  }

  public handleFlightRecordSubmit() {
    const flightId = this.adminService.activeFlightId;
    const { airline, flightDay } = this.flightRecordForm.value;

    if (this.adminService.editingRecord) {
      this.flightService
        .editFlightRecord(
          this.adminService.editingRecord._id,
          airline,
          flightDay
        )
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (res) => {
            this.adminService.setNotificationMessage('Record updated');
            this.adminService.showNotification();
            this.adminService.isRecordFormShown.next(false);
            this.adminService.editingFlight = null;
            this.reloadService.reloadComponent();
          },
        });
      return;
    }
    this.flightService
      .addFlightRecord(flightId, airline, this.departureTimes)
      .subscribe({
        next: (res) => {
          this.adminService.setNotificationMessage('Flight record created!');
          this.adminService.showNotification();
          this.adminService.isRecordFormShown.next(false);
        },
      });
  }

  ngOnInit(): void {
    this.minDate = new Date().toISOString().split('T')[0];
    if (this.adminService.editingRecord) {
      const { flightDay } = this.adminService.editingRecord;

      const indx = flightDay.toString().indexOf('T');
      const departureDate = flightDay.toString().slice(0, indx);

      this.flightRecordForm.patchValue({
        airline: this.adminService.editingRecord.airplaneId.company,
        flightDay: departureDate,
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
