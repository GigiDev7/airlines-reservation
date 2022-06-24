import { Component, Input, OnInit } from '@angular/core';
import { TicketService } from 'src/app/tickets/tickets.service';
import { ModalService } from './modal.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() modalText!: string;

  public closeModal() {
    this.ticketService.tobeBookedTicket = null;
    this.modalService.isModalShown.next(false);
  }

  public onConfirmClick() {
    if (this.modalService.modalFor === 'booking') {
      this.bookTicket();
    }
  }

  private bookTicket() {
    if (this.ticketService.tobeBookedTicket) {
      const { flightRecordId, ticketClass } =
        this.ticketService.tobeBookedTicket;
      this.ticketService
        .bookTicket(flightRecordId, ticketClass)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (res) => {
            this.router.navigate(['bookings']);
          },
        });
    }
  }

  constructor(
    private modalService: ModalService,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
