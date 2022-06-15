import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './admin.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FlightFormComponent } from './flight-form/flight-form.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [AdminComponent, SideNavComponent, FlightFormComponent],
  imports: [MatIconModule, CommonModule, AppRoutingModule],
  exports: [AdminComponent, SideNavComponent],
})
export class AdminModule {}
