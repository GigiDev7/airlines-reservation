import { Component, Input, OnInit } from '@angular/core';
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
  @Input() total!: number;
  @Input() perPage!: number;
  @Input() paginatorFor!: string;
  public isLoading: boolean = false;

  public handlePreviousPageClick() {
    //this.page--;
    if (this.paginatorFor === 'records') {
      this.router.navigate(['admin', 'records'], {
        queryParams: { page: this.page - 1 },
      });
    } else if (this.paginatorFor === 'tickets') {
      const { flightRecordId } = this.route.snapshot.params;
      this.router.navigate(['admin', 'tickets', flightRecordId], {
        queryParams: { page: this.page - 1 },
      });
    }
  }

  public handleNextPageClick() {
    //this.page++;
    if (this.paginatorFor === 'records') {
      this.router.navigate(['admin', 'records'], {
        queryParams: { page: this.page + 1 },
      });
    } else if (this.paginatorFor === 'tickets') {
      const { flightRecordId } = this.route.snapshot.params;
      this.router.navigate(['admin', 'tickets', flightRecordId], {
        queryParams: { page: this.page + 1 },
      });
    }
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
    this.totalPages = Math.ceil(this.total / this.perPage);
  }
}
