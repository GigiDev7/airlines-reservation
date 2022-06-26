import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.sass'],
})
export class TicketFormComponent implements OnInit {
  public closeTicketForm() {
    this.adminService.isTicketFormShown.next(false);
  }

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}
}
