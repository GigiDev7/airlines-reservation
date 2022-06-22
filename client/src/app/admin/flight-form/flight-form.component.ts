import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightService } from 'src/app/flights/flights.service';
import { AdminService } from '../admin.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { ReloadService } from 'src/app/shared/reload/reload.service';
import { FlightModel } from 'src/app/shared/models/flightsModel';

@UntilDestroy()
@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.sass'],
})
export class FlightFormComponent implements OnInit {
  public flightForm: FormGroup = new FormGroup({
    departure: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    departureTime: new FormControl('', [Validators.required]),
    arrivalTime: new FormControl('', [Validators.required]),
  });
  public editingFlight: FlightModel | null = null;

  public handleFlightFormSubmit() {
    const { departure, destination, departureTime, arrivalTime } =
      this.flightForm.value;
    if (this.editingFlight) {
      this.flightService
        .editFlight(
          this.editingFlight._id,
          departure,
          destination,
          departureTime,
          arrivalTime
        )
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (val) => {
            this.adminService.isFlightFormShown.next(false);
            this.adminService.setNotificationMessage('Flight edited');
            this.adminService.showNotification();
            this.adminService.editingFlight = null;
            this.reloadService.reloadComponent();
          },
        });
      return;
    }
    this.flightService
      .addFlight(departure, destination, departureTime, arrivalTime)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (val) => {
          this.adminService.isFlightFormShown.next(false);
          this.adminService.setNotificationMessage('New flight created');
          this.adminService.showNotification();
          this.reloadService.reloadComponent();
        },
      });
  }

  constructor(
    private adminService: AdminService,
    private flightService: FlightService,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    this.editingFlight = this.adminService.editingFlight;
    if (this.editingFlight) {
      this.flightForm.patchValue({
        departure: this.editingFlight.departure,
        destination: this.editingFlight.destination,
        departureTime: this.editingFlight.departureTime,
        arrivalTime: this.editingFlight.arrivalTime,
      });
    }
  }
}
