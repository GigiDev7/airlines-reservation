import { Component, OnInit } from '@angular/core';
import { TicketModel } from '../shared/models/ticketModel';
import { TicketService } from '../tickets/tickets.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.sass'],
})
export class BookingsComponent implements OnInit {
  public ticket: TicketModel | null = null;
  public isFetching: boolean = false;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.ticketService
      .getTicketByUser()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.ticket = res;
          this.isFetching = false;
        },
      });
  }
}
