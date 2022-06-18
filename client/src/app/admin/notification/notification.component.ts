import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass'],
})
export class NotificationComponent implements OnInit {
  @Input() notificationMessage!: string;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.notificationMessage = this.adminService.notificationMessage;
  }
}
