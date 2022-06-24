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

  constructor() {}

  ngOnInit(): void {}
}
