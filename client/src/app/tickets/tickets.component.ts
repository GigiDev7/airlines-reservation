import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from './tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.sass'],
})
export class TicketsComponent implements OnInit {
  constructor(
    private ticketsService: TicketsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { recordId } = this.route.snapshot.params;
    this.ticketsService.getTickets(recordId).subscribe({
      next: (val) => console.log(val),
    });
  }
}
