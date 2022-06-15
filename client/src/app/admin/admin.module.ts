import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './admin.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlightRecordComponent } from './flight-record/flight-record.component';

@NgModule({
  declarations: [AdminComponent, SideNavComponent, FlightRecordComponent],
  imports: [ReactiveFormsModule, MatIconModule, CommonModule, AppRoutingModule],
  exports: [AdminComponent, SideNavComponent, FlightRecordComponent],
})
export class AdminModule {}
