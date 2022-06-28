import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { FlightCardComponent } from '../flights/flight-card/flight-card.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FlightCardComponent, PaginatorComponent, ModalComponent],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, FormsModule],
  exports: [FlightCardComponent, PaginatorComponent, ModalComponent],
})
export class SharedModule {}
