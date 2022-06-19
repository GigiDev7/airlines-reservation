import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/flights/flights.service';
import { FlightRecordModel } from 'src/app/shared/models/flightRecordModel';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReloadService } from 'src/app/shared/reload/reload.service';
import { AdminService } from '../admin.service';

@UntilDestroy()
@Component({
  selector: 'app-admin-records',
  templateUrl: './admin-records.component.html',
  styleUrls: ['./admin-records.component.sass'],
})
export class AdminRecordsComponent implements OnInit {
  public flightRecords!: { total: 0; records: FlightRecordModel[] };
  public isFetching: boolean = false;
  public isRecordFormShown: boolean = false;

  public trackBy(index: number, item: FlightRecordModel) {
    return item._id;
  }

  public handleDeleteRecord(record: FlightRecordModel) {
    this.flightService.deleteFlightRecord(record._id).subscribe({
      next: () => {
        this.adminService.setNotificationMessage('Record deleted');
        this.adminService.showNotification();
        this.reloadService.reloadComponent();
      },
    });
  }

  public handleEditRecord(record: FlightRecordModel) {
    this.adminService.isRecordFormShown.next(true);
    this.adminService.editingRecord = record;
  }

  constructor(
    private flightService: FlightService,
    private reloadService: ReloadService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.flightService
      .getAllRecords()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.isFetching = false;
          this.flightRecords = res;
        },
      });
    this.adminService.isRecordFormShown.subscribe({
      next: (val) => (this.isRecordFormShown = val),
    });
  }
}
