import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightRecordModel } from 'src/app/shared/models/flightRecordModel';
import { TicketModel } from 'src/app/shared/models/ticketModel';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent implements OnInit {
  @Input() ticket!: TicketModel;

  public getAvailableSum(
    ticketClass: 'business' | 'standart' | 'econom' | undefined
  ) {
    if (ticketClass) {
      return this.ticket.flightRecordId[`${ticketClass}Tickets`];
    }
    return '0';
  }

  constructor() {}

  ngOnInit(): void {}
}
