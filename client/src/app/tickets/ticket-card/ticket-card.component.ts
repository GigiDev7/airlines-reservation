import { Component, Input, OnInit } from '@angular/core';
import { TicketModel } from 'src/app/shared/models/ticketModel';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.sass'],
})
export class TicketCardComponent implements OnInit {
  @Input() ticket!: TicketModel;

  constructor() {}

  ngOnInit(): void {}
}
