import { Component, OnInit } from '@angular/core';
import { TicketModel } from 'src/app/shared/models/ticketModel';
import { ReloadService } from 'src/app/shared/reload/reload.service';
import { TicketService } from 'src/app/tickets/tickets.service';
import { AdminService } from '../admin.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.sass'],
})
export class TicketFormComponent implements OnInit {
  public ticketClass: string = '';
  public ticketPrice: number = 0;

  public closeTicketForm() {
    this.adminService.isTicketFormShown.next(false);
    this.adminService.editingTicket = null;
  }

  public submitTicketEdit() {
    if (this.adminService.editingTicket) {
      this.ticketService
        .updateTicket(
          this.adminService.editingTicket._id,
          +this.ticketPrice,
          this.ticketClass
        )
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (res) => {
            this.adminService.editingTicket = null;
            this.adminService.isTicketFormShown.next(false);
            this.adminService.setNotificationMessage('Ticket Edited');
            this.adminService.showNotification();
            this.reloadService.reloadComponent();
          },
        });
    }
  }

  constructor(
    private adminService: AdminService,
    private ticketService: TicketService,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    if (this.adminService.editingTicket) {
      this.ticketClass = this.adminService.editingTicket.ticketClass;
      this.ticketPrice = this.adminService.editingTicket.price;
      console.log(this.ticketClass);
    }
  }
}
