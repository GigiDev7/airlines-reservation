import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './admin.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlightRecordComponent } from './flight-record/flight-record.component';
import { AdminFlightsComponent } from './admin-flights/admin-flights.component';
import { SharedModule } from '../shared/shared.module';
import { NotificationComponent } from './notification/notification.component';
import { FlightFormComponent } from './flight-form/flight-form.component';
import { AdminRecordsComponent } from './admin-records/admin-records.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminAirplanesComponent } from './admin-airplanes/admin-airplanes.component';

@NgModule({
  declarations: [
    AdminComponent,
    SideNavComponent,
    FlightRecordComponent,
    AdminFlightsComponent,
    NotificationComponent,
    FlightFormComponent,
    AdminRecordsComponent,
    AdminAirplanesComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  exports: [
    AdminComponent,
    SideNavComponent,
    FlightRecordComponent,
    AdminFlightsComponent,
  ],
})
export class AdminModule {}
