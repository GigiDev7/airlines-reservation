import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketModel } from '../shared/models/ticketModel';
import { TicketsService } from './tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.sass'],
})
export class TicketsComponent implements OnInit {
  public tickets: TicketModel[] = [];
  public isFetching: boolean = false;

  constructor(
    private ticketsService: TicketsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    const { recordId } = this.route.snapshot.params;
    this.ticketsService.getTickets(recordId).subscribe({
      next: (res) => {
        this.tickets = res;
        this.isFetching = false;
      },
    });
  }
}
