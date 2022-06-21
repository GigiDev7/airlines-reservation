import { Component, OnInit } from '@angular/core';
import { AirplaneModel } from 'src/app/shared/models/airplaneModel';
import { AdminService } from '../admin.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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

  constructor(private adminService: AdminService) {}

  public handleEditAirplane(airplane: AirplaneModel) {
    this.isAirplaneFormShown = true;
    this.editingAirplane = airplane;
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
