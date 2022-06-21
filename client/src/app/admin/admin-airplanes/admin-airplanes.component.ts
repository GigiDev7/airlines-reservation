import { Component, OnInit } from '@angular/core';
import { AirplaneModel } from 'src/app/shared/models/airplaneModel';
import { AdminService } from '../admin.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReloadService } from 'src/app/shared/reload/reload.service';

@UntilDestroy()
@Component({
  selector: 'app-admin-airplanes',
  templateUrl: './admin-airplanes.component.html',
  styleUrls: ['./admin-airplanes.component.sass'],
})
export class AdminAirplanesComponent implements OnInit {
  public airplanes: AirplaneModel[] = [];
  public isFetching = false;
  public isAirplaneFormShown: boolean = false;
  public editingAirplane: AirplaneModel | null = null;
  public airplaneCompany: string = '';

  constructor(
    private adminService: AdminService,
    private reloadService: ReloadService
  ) {}

  public handleAirplaneSubmit() {
    if (this.editingAirplane) {
      this.adminService
        .editAirplane(this.editingAirplane._id, this.airplaneCompany)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            this.adminService.setNotificationMessage('Airplane Updated');
            this.adminService.showNotification();
            this.reloadService.reloadComponent();
          },
        });
    }

    this.adminService
      .createAirplane(this.airplaneCompany)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.adminService.setNotificationMessage('Airplane Created');
          this.adminService.showNotification();
          this.isAirplaneFormShown = false;
          this.reloadService.reloadComponent();
        },
      });
  }

  public handleEditAirplane(airplane: AirplaneModel) {
    this.isAirplaneFormShown = true;
    this.editingAirplane = airplane;
  }

  public handleDeleteAirplane(airplaneId: string) {
    this.adminService
      .deleteAirplane(airplaneId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.adminService.setNotificationMessage('Airplane Deleted');
          this.adminService.showNotification();
          this.reloadService.reloadComponent();
        },
      });
  }

  public closeAirplaneForm() {
    this.isAirplaneFormShown = false;
    this.editingAirplane = null;
  }

  ngOnInit(): void {
    this.isFetching = true;
    this.adminService
      .getAirplanes()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          this.airplanes = res;
          this.isFetching = false;
        },
      });
  }
}
