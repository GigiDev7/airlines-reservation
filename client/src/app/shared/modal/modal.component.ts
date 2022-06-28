import { Component, Input, OnInit } from '@angular/core';
import { TicketService } from 'src/app/tickets/tickets.service';
import { ModalService } from './modal.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { ReloadService } from '../reload/reload.service';

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
    this.ticketService.tobeReturnedTicketId = null;
    this.modalService.isModalShown.next(false);
  }

  public onConfirmClick() {
    if (this.modalService.modalFor === 'bookTicket') {
      this.bookTicket();
    } else if (this.modalService.modalFor === 'returnTicket') {
      this.returnTicket();
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

  private returnTicket() {
    if (this.ticketService.tobeReturnedTicketId) {
      this.ticketService
        .returnTicket(this.ticketService.tobeReturnedTicketId)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (res) => {
            this.modalService.isModalShown.next(false);
            this.reloadService.reloadComponent();
          },
        });
    }
  }

  constructor(
    private modalService: ModalService,
    private ticketService: TicketService,
    private router: Router,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {}
}
