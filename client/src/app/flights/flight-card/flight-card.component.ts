import { Component, Input, OnInit } from '@angular/core';
import { FlightModel } from 'src/app/shared/models/flightsModel';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent implements OnInit {
  @Input() flight!: FlightModel;

  constructor() {}

  ngOnInit(): void {}
}
