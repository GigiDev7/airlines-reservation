import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightRecordModel } from 'src/app/shared/models/flightRecordModel';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent implements OnInit {
  @Input() flightRecord!: FlightRecordModel;

  constructor() {}

  ngOnInit(): void {}
}
