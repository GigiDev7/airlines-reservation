import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './admin.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlightFormComponent } from './flight-form/flight-form.component';

@NgModule({
  declarations: [AdminComponent, SideNavComponent, FlightFormComponent],
  imports: [ReactiveFormsModule, MatIconModule, CommonModule, AppRoutingModule],
  exports: [AdminComponent, SideNavComponent, FlightFormComponent],
})
export class AdminModule {}
