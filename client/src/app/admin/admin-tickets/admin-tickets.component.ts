import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketModel } from 'src/app/shared/models/ticketModel';
import { TicketService } from 'src/app/tickets/tickets.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-admin-tickets',
  templateUrl: './admin-tickets.component.html',
  styleUrls: ['./admin-tickets.component.sass'],
})
export class AdminTicketsComponent implements OnInit {
  public tickets!: { total: number; tickets: TicketModel[] };
  public isFetching: boolean = false;

  public trackBy(index: number, item: TicketModel) {
    return item._id;
  }

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isFetching = true;

    this.route.queryParams
      .pipe(
        tap({
          next: () => {
            this.isFetching = true;
            this.tickets = { total: 0, tickets: [] };
          },
        })
      )
      .subscribe({
        next: (params) => {
          const { flightRecordId } = this.route.snapshot.params;
          this.ticketService
            .getTicketsByRecord(flightRecordId, params['page'])
            .pipe(untilDestroyed(this))
            .subscribe({
              next: (res: any) => {
                this.tickets = res;
                this.isFetching = false;
              },
            });
        },
      });
  }
}
