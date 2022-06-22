import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightRecordModel } from 'src/app/shared/models/flightRecordModel';
import { FlightModel } from 'src/app/shared/models/flightsModel';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent implements OnInit {
  @Input() flightRecord!: FlightRecordModel;

  public handleTicketRedirect() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('admin')) {
      this.router.navigate(['admin', 'tickets']);
    } else {
      this.router.navigate(['tickets']);
    }
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
