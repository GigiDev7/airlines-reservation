import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightService } from 'src/app/flights/flights.service';
import { AdminService } from '../admin.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

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
  });

  public handleFlightFormSubmit() {
    const { departure, destination } = this.flightForm.value;
    this.flightService
      .addFlight(departure, destination)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (val) => {
          this.adminService.isFlightFormShown.next(false);
          this.adminService.setNotificationMessage('New flight created');
          this.adminService.showNotification();
        },
      });
  }

  constructor(
    private adminService: AdminService,
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
