import { Component, OnInit } from '@angular/core';
import { TicketModel } from '../shared/models/ticketModel';
import { TicketService } from '../tickets/tickets.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ModalService } from '../shared/modal/modal.service';
import { FormControl, Validators } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.sass'],
})
export class BookingsComponent implements OnInit {
  public tickets: TicketModel[] = [];
  public isFetching: boolean = false;
  public isModalShown: boolean = false;

  public isReturnAvailable(ticket: TicketModel): boolean {
    const lastDayToReturn = new Date(
      (new Date(ticket?.record?.flightDay as any) as any) - 1000 * 60 * 60 * 24
    );

    return lastDayToReturn < new Date();
  }

  public handleTicketReturn(ticket: TicketModel) {
    this.modalService.modalFor = 'returnTicket';
    this.modalService.isModalShown.next(true);
    this.ticketService.tobeReturnedTicketId = ticket._id;
  }

  constructor(
    private ticketService: TicketService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.modalService.isModalShown.subscribe({
      next: (val) => (this.isModalShown = val),
    });
    this.isFetching = true;
    this.ticketService
      .getTicketsByUser()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.tickets = res;
          this.isFetching = false;
        },
      });
  }
}
