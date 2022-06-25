import { Component, OnInit } from '@angular/core';
import { TicketModel } from '../shared/models/ticketModel';
import { TicketService } from '../tickets/tickets.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ModalService } from '../shared/modal/modal.service';

@UntilDestroy()
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.sass'],
})
export class BookingsComponent implements OnInit {
  public ticket: TicketModel | null = null;
  public isFetching: boolean = false;
  public isModalShown: boolean = false;
  public isReturnAvailable: boolean = true;

  public handleTicketReturn() {
    this.modalService.modalFor = 'returnTicket';
    this.modalService.isModalShown.next(true);
    this.ticketService.tobeReturnedTicketId = this.ticket!._id;
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
      .getTicketByUser()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.ticket = res;
          this.isFetching = false;
          const lastDayToReturn = new Date(
            (new Date(this.ticket?.flightRecordId?.flightDay as any) as any) -
              1000 * 60 * 60 * 24
          );
          if (lastDayToReturn > new Date()) {
            this.isReturnAvailable = true;
          } else {
            this.isReturnAvailable = false;
          }
        },
      });
  }
}
