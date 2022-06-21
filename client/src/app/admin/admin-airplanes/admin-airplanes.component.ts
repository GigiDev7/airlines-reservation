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

  constructor(private adminService: AdminService) {}

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
