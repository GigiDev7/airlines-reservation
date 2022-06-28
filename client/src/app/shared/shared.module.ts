import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { FlightCardComponent } from '../flights/flight-card/flight-card.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [FlightCardComponent, PaginatorComponent, ModalComponent],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  exports: [FlightCardComponent, PaginatorComponent, ModalComponent],
})
export class SharedModule {}
