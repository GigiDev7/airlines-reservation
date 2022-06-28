import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/flights/flights.service';
import { FlightRecordModel } from 'src/app/shared/models/flightRecordModel';
import { FlightModel } from 'src/app/shared/models/flightsModel';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AdminService } from '../admin.service';
import { ReloadService } from 'src/app/shared/reload/reload.service';
import { LocationService } from 'src/app/home/services/locations.service';
import { LocationModel } from 'src/app/shared/models/locationModel';

@UntilDestroy()
@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.sass'],
})
export class AdminFlightsComponent implements OnInit {
  public flights: FlightModel[] = [];
  public isFetching: boolean = false;
  public isRecordFormShown: boolean = false;
  public isFlightFormShown: boolean = false;

  private locations: LocationModel[] = [];
  public filteredLocations: LocationModel[] = [];
  public departureCity: string = '';
  public destinationCity: string = '';
  public locationFor: string = '';

  public openRecordForm(flightId: string) {
    this.adminService.activeFlightId = flightId;
    this.adminService.isRecordFormShown.next(true);
  }

  public closeRecordForm() {
    this.adminService.isRecordFormShown.next(false);
  }

  public openFlightForm() {
    this.adminService.isFlightFormShown.next(true);
  }

  public closeFlightForm() {
    this.adminService.isFlightFormShown.next(false);
    this.adminService.editingFlight = null;
  }

  public handleLocationChange(e: Event, type: string) {
    const target = e.target as HTMLInputElement;
    this.locationFor = type;
    if (target.value) {
      this.filteredLocations = this.locations.filter((location) =>
        location?.city?.toLowerCase().includes(target.value.toLowerCase())
      );
    } else {
      this.filteredLocations = [];
    }
  }

  public handleLocationClick(city: string) {
    if (this.locationFor === 'departure') {
      this.departureCity = city;
      this.filteredLocations = [];
    } else if (this.locationFor === 'destination') {
      this.destinationCity = city;
      this.filteredLocations = [];
    }
  }

  public handleDeleteFlight(flightId: string) {
    this.flightService
      .deleteFlight(flightId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.adminService.setNotificationMessage('Flight deleted');
          this.adminService.showNotification();
          this.reloadService.reloadComponent();
        },
      });
  }

  public handleEditFlight(flight: FlightModel) {
    this.adminService.isFlightFormShown.next(true);
    this.adminService.editingFlight = flight;
  }

  public handleFlightFilter() {
    this.isFetching = true;
    this.flightService
      .getFilteredFlights(
        this.departureCity.toLowerCase(),
        this.destinationCity.toLowerCase()
      )
      .subscribe({
        next: (res: any) => {
          this.isFetching = false;
          this.flights = res;
        },
      });
  }

  constructor(
    private flightService: FlightService,
    public adminService: AdminService,
    private reloadService: ReloadService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.flightService
      .getFlights()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.flights = res;
          this.isFetching = false;
        },
      });

    this.adminService.isRecordFormShown.subscribe({
      next: (val) => (this.isRecordFormShown = val),
    });
    this.adminService.isFlightFormShown.subscribe({
      next: (val) => (this.isFlightFormShown = val),
    });

    this.locationService.getLocations().subscribe({
      next: (res) => {
        this.locations = res;
      },
    });
  }
}
