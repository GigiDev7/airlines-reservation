import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from 'src/app/flights/flights.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass'],
})
export class PaginatorComponent implements OnInit {
  public page: number = 1;
  public totalPages!: number;
  public isLoading: boolean = false;

  public handlePreviousPageClick() {
    //this.page--;
    this.router.navigate(['admin', 'records'], {
      queryParams: { page: this.page - 1 },
    });
  }

  public handleNextPageClick() {
    //this.page++;
    this.router.navigate(['admin', 'records'], {
      queryParams: { page: this.page + 1 },
    });
  }

  constructor(
    private flightService: FlightService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.page = +params['page'];
      },
    });
    this.totalPages = Math.ceil(this.flightService.flightRecords.total / 5);
  }
}
