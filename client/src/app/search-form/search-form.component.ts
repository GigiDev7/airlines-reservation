import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../home/services/locations.service';
import { LocationModel } from '../shared/models/locationModel';

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

  public flightForm: FormGroup = new FormGroup({
    departure: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    departureTime: new FormControl('', [Validators.required]),
    returnTime: new FormControl('', [Validators.required]),
  });

  public handleInputFocus(element: HTMLInputElement): void {
    element.type = 'date';
  }
  public handleInputBlur(element: HTMLInputElement): void {
    element.type = 'text';
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
    console.log(this.flightForm);
  }

  public trackBy(index: number, item: LocationModel) {
    return item._id;
  }

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.minDate = new Date().toISOString().split('T')[0];
    this.locationService.getLocations().subscribe((data) => {
      this.locations = data;
    });
  }
}
