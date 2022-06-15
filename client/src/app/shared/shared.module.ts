import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { FlightCardComponent } from '../flights/flight-card/flight-card.component';

@NgModule({
  declarations: [FlightCardComponent],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  exports: [FlightCardComponent],
})
export class SharedModule {}
