import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/flights/flights.service';
import { FlightRecordModel } from 'src/app/shared/models/flightRecordModel';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReloadService } from 'src/app/shared/reload/reload.service';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { LocationModel } from 'src/app/shared/models/locationModel';
import { LocationService } from 'src/app/home/services/locations.service';

@UntilDestroy()
@Component({
  selector: 'app-admin-records',
  templateUrl: './admin-records.component.html',
  styleUrls: ['./admin-records.component.sass'],
})
export class AdminRecordsComponent implements OnInit {
  public flightRecords!: { total: number; records: FlightRecordModel[] };
  public isFetching: boolean = false;
  public isRecordFormShown: boolean = false;

  //

  private locations: LocationModel[] = [];
  public filteredLocations: LocationModel[] = [];
  public departureCity: string = '';
  public destinationCity: string = '';
  public locationFor: string = '';

  public departureStart!: Date;
  public departureEnd!: Date;

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

  public handleRecordsFilter() {
    this.isFetching = true;
    this.flightService
      .getFilteredRecords(
        this.departureCity.toLowerCase(),
        this.destinationCity.toLowerCase(),
        this.departureStart,
        this.departureEnd
      )
      .subscribe({
        next: (res: any) => {
          this.flightRecords = res;
          this.isFetching = false;
        },
      });
  }
  //

  public trackBy(index: number, item: FlightRecordModel) {
    return item._id;
  }

  public closeRecordForm() {
    this.isRecordFormShown = false;
    this.adminService.editingRecord = null;
  }

  public handleDeleteRecord(record: FlightRecordModel) {
    this.flightService.deleteFlightRecord(record._id).subscribe({
      next: () => {
        this.adminService.setNotificationMessage('Record deleted');
        this.adminService.showNotification();
        if (
          +this.route.snapshot.queryParams['page'] > 1 &&
          this.flightRecords.records.length === 1
        ) {
          this.router.navigate(['admin', 'records'], {
            queryParams: { page: +this.route.snapshot.queryParams['page'] - 1 },
          });
        } else {
          this.reloadService.reloadComponent();
        }
      },
    });
  }

  public handleEditRecord(record: FlightRecordModel) {
    this.adminService.isRecordFormShown.next(true);
    this.adminService.editingRecord = record;
  }

  public navigateToTickets(flightRecordId: string) {
    this.router.navigate(['admin', 'tickets', flightRecordId], {
      queryParams: { page: 1 },
    });
  }

  constructor(
    private flightService: FlightService,
    private reloadService: ReloadService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.route.queryParams
      .pipe(
        tap({
          next: () => {
            this.isFetching = true;
            this.flightRecords = { total: 0, records: [] };
          },
        })
      )
      .subscribe({
        next: (params) => {
          this.flightService
            .getAllRecords(params['page'])
            .pipe(untilDestroyed(this))
            .subscribe({
              next: (res: any) => {
                this.isFetching = false;
                this.flightRecords = res;
              },
            });
        },
      });

    this.adminService.isRecordFormShown.subscribe({
      next: (val) => (this.isRecordFormShown = val),
    });

    this.locationService.getLocations().subscribe({
      next: (res) => {
        this.locations = res;
      },
    });
  }
}
