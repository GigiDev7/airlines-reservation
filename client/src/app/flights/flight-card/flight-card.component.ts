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
  public isAmountSelected: boolean = false;
  public userData: { firstname: string; lastname: string }[] = [];

  public handleBookClick(flightRecordId: string, ticketClass: string) {
    /* this.ticketService.tobeBookedTicket = { flightRecordId, ticketClass };
    this.modalService.modalFor = 'bookTicket';
    this.modalService.isModalShown.next(true); */
    this.isBookingFormShown = true;
  }

  public closeBookingForm() {
    this.isBookingFormShown = false;
    this.isAmountError = false;
    this.isAmountSelected = false;
    this.numberOfTickets = 1;
    this.firstname = '';
    this.lastname = '';
  }

  public handleTicketBook() {
    this.ticketService
      .bookTicket(
        this.ticket.record._id,
        this.ticket.ticketClass,
        this.numberOfTickets,
        this.userData
      )
      .subscribe({
        next: (res) => {
          this.router.navigate(['bookings']);
        },
      });
  }

  public handleNextClick() {
    if (this.numberOfTickets > this.ticket.available) {
      this.isAmountError = true;
    } else {
      this.isAmountSelected = true;
      this.isAmountError = false;
      this.generateUserDataFields();
    }
  }

  public numOfSequence(n: number) {
    return Array(n);
  }

  public generateUserDataFields() {
    for (let num of this.numOfSequence(this.numberOfTickets)) {
      const userObj = { firstname: '', lastname: '' };
      this.userData.push(userObj);
    }
  }

  constructor(
    private ticketService: TicketService,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
