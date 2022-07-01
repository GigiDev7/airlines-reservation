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
  public isBookingFormShown: boolean = false;
  public numberOfTickets: number = 1;
  public firstname: string = '';
  public lastname: string = '';
  public isAmountError: boolean = false;

  public handleBookClick(flightRecordId: string, ticketClass: string) {
    /* this.ticketService.tobeBookedTicket = { flightRecordId, ticketClass };
    this.modalService.modalFor = 'bookTicket';
    this.modalService.isModalShown.next(true); */
    this.isBookingFormShown = true;
  }

  public closeBookingForm() {
    this.isBookingFormShown = false;
    this.isAmountError = false;
  }

  public handleTicketBook() {
    if (this.numberOfTickets > this.ticket.available) {
      this.isAmountError = true;
      return;
    }
    this.ticketService
      .bookTicket(
        this.ticket.record._id,
        this.ticket.ticketClass,
        this.numberOfTickets,
        this.firstname,
        this.lastname
      )
      .subscribe({
        next: (res) => {
          this.router.navigate(['bookings']);
        },
      });
  }

  constructor(
    private ticketService: TicketService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
