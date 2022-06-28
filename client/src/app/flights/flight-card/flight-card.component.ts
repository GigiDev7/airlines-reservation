import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { FlightRecordModel } from 'src/app/shared/models/flightRecordModel';
import { TicketModel } from 'src/app/shared/models/ticketModel';
import { TicketService } from 'src/app/tickets/tickets.service';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent implements OnInit {
  @Input() ticket!: TicketModel;

  public handleTicketBook(flightRecordId: string, ticketClass: string) {
    this.ticketService.tobeBookedTicket = { flightRecordId, ticketClass };
    this.modalService.modalFor = 'bookTicket';
    this.modalService.isModalShown.next(true);
  }

  constructor(
    private ticketService: TicketService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}
}
