import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from './flights.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FlightRecordModel } from '../shared/models/flightRecordModel';
import { tap } from 'rxjs';
import { TicketService } from '../tickets/tickets.service';
import { TicketModel } from '../shared/models/ticketModel';

@UntilDestroy()
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.sass'],
})
export class FlightsComponent implements OnInit {
  public flightRecords!: { total: number; records: FlightRecordModel[] };
  public isFetching: boolean = false;
  public companies: any[] = [];
  public checkedCompanies: string[] = [];
  public tickets: TicketModel[] = [];
  public priceMin: string = '';
  public priceMax: string = '';
  public ticketClass: string = '';

  public handleFilter() {
    this.isFetching = true;
    const { departure, destination, departureStart, departureEnd } =
      this.route.snapshot.queryParams;
    this.ticketService
      .getTickets(
        departure.toLowerCase(),
        destination.toLowerCase(),
        departureStart,
        departureEnd,
        this.checkedCompanies.toString(),
        this.ticketClass === 'all' ? '' : this.ticketClass,
        this.priceMin,
        this.priceMax
      )
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          this.tickets = res;
          this.isFetching = false;
        },
      });
  }

  public handleCheckbox(e: Event) {
    const target = e.target as HTMLInputElement;
    const { departure, destination, departureStart, departureEnd } =
      this.route.snapshot.queryParams;

    if (target.checked) {
      this.checkedCompanies.push(target.value);
    } else {
      this.checkedCompanies = this.checkedCompanies.filter(
        (company) => company !== target.value
      );
    }
    this.isFetching = true;
    this.ticketService
      .getTickets(
        departure.toLowerCase(),
        destination.toLowerCase(),
        departureStart,
        departureEnd,
        this.checkedCompanies.toString()
      )
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.tickets = res;
          this.isFetching = false;
        },
      });
  }

  constructor(
    public flightService: FlightService,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.route.queryParams
      .pipe(
        tap(
          () => (
            (this.isFetching = true),
            (this.flightRecords = { total: 0, records: [] })
          )
        )
      )
      .subscribe({
        next: (params) =>
          /*  this.flightService
            .getFilteredRecords(
              params['departure'].toLowerCase(),
              params['destination'].toLowerCase(),
              params['departureStart'],
              params['departureEnd']
            )
            .pipe(untilDestroyed(this))
            .subscribe({
              next: (res: any) => {
                this.flightRecords = res;
                this.isFetching = false;
                this.companies = [
                  ...new Set(
                    res.records.map(
                      (item: FlightRecordModel) => item.airplaneId.company
                    )
                  ),
                ];
                this.checkedCompanies = [...this.companies];
              },
            }), */
          this.ticketService
            .getTickets(
              params['departure'].toLowerCase(),
              params['destination'].toLowerCase(),
              params['departureStart'],
              params['departureEnd']
            )
            .pipe(untilDestroyed(this))
            .subscribe({
              next: (res) => {
                this.isFetching = false;
                this.tickets = res;
                this.companies = [
                  ...new Set(
                    res.map(
                      (item: any) => item.flightRecordId.airplaneId.company
                    )
                  ),
                ];
                this.checkedCompanies = [...this.companies];
              },
            }),
      });
  }
}
