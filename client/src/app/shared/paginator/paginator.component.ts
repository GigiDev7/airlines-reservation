import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/flights/flights.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass'],
})
export class PaginatorComponent implements OnInit {
  public page: number = 1;
  public totalPages!: number;

  public handlePreviousPageClick() {
    this.page--;
  }

  public handleNextPageClick() {
    this.page++;
  }

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.totalPages = Math.ceil(
      this.flightService.flightRecords.records.length / 5
    );
  }
}
