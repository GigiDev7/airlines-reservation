import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../home/services/locations.service';
import { LocationModel } from '../shared/models/locationModel';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.sass'],
})
export class SearchFormComponent implements OnInit {
  public minDate!: String;
  public locations: LocationModel[] = [];
  public filteredLocations: LocationModel[] = [];
  public filtersType: string = '';
  public isMoreFiltersShown: boolean = false;
  public isFlightsPage: boolean = false;

  public flightForm: FormGroup = new FormGroup({
    departure: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    departureStart: new FormControl('', [Validators.required]),
    departureEnd: new FormControl('', [Validators.required]),
    priceMin: new FormControl(''),
    priceMax: new FormControl(''),
    ticketClass: new FormControl(''),
    availableTickets: new FormControl(''),
    sort: new FormControl(''),
  });

  public handleMoreFiltersShow() {
    this.isMoreFiltersShown = !this.isMoreFiltersShown;
  }

  public handleInputFocus(element: HTMLInputElement): void {
    element.type = 'date';
  }
  public handleInputBlur(element: HTMLInputElement): void {
    element.type = 'text';
  }

  public hideTypeAhead(e: Event): void {
    if (!(e.target instanceof HTMLLIElement)) {
      this.filteredLocations = [];
      this.filtersType = '';
    }
  }

  public handleLocationChange(event: Event, type: string): void {
    if ((event.target as HTMLInputElement).value.length > 0) {
      this.filtersType = type;
      this.filteredLocations = this.locations.filter((location) => {
        return location?.city
          ?.toLowerCase()
          ?.includes((event.target as HTMLInputElement).value.toLowerCase());
      });
    } else {
      this.filtersType = '';
      this.filteredLocations = [];
    }
  }

  public handleLocationClick(location: LocationModel) {
    if (this.filtersType === 'departure') {
      this.flightForm.patchValue({
        departure: location.city,
      });
    } else {
      this.flightForm.patchValue({
        destination: location.city,
      });
    }
    this.filtersType = '';
    this.filteredLocations = [];
  }

  public handleFlightFormSubmit() {
    this.router.navigate(['flights'], {
      queryParams: {
        departure: this.flightForm.get('departure')?.value,
        destination: this.flightForm.get('destination')?.value,
        departureStart: this.flightForm.get('departureStart')?.value,
        departureEnd: this.flightForm.get('departureEnd')?.value,
        priceMin: this.flightForm.get('priceMin')?.value,
        priceMax: this.flightForm.get('priceMax')?.value,
        availableTickets: this.flightForm.get('availableTickets')?.value,
        ticketClass: this.flightForm.get('ticketClass')?.value,
        sort: this.flightForm.get('sort')?.value,
      },
    });
  }

  public trackBy(index: number, item: LocationModel) {
    return item._id;
  }

  constructor(
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const url = this.router.url;
    if (url.includes('flights')) {
      this.isFlightsPage = true;
    } else {
      this.isFlightsPage = false;
    }

    this.minDate = new Date().toISOString().split('T')[0];
    this.locationService
      .getLocations()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.locations = data;
      });
    this.route.queryParams.subscribe({
      next: (params) =>
        this.flightForm.patchValue({
          departure: params['departure'],
          destination: params['destination'],
          departureStart: params['departureStart'],
          departureEnd: params['departureEnd'],
        }),
    });
  }
}
