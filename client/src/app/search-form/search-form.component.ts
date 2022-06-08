import { Component, OnInit } from '@angular/core';
import { LocationService } from '../home/services/locations.service';
import { LocationModel } from '../shared/models/locationModel';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.sass'],
})
export class SearchFormComponent implements OnInit {
  public handleInputFocus(element: HTMLInputElement): void {
    element.type = 'date';
  }
  public handleInputBlur(element: HTMLInputElement): void {
    element.type = 'text';
  }
  public minDate!: String;
  public locations: LocationModel[] = [];
  public filteredLocations: LocationModel[] = [];

  public handleLocationChange(event: Event): void {
    if ((event.target as HTMLInputElement).value.length > 0) {
      this.filteredLocations = this.locations.filter((location) => {
        return location?.city
          ?.toLowerCase()
          ?.includes((event.target as HTMLInputElement).value.toLowerCase());
      });
    } else {
      this.filteredLocations = [];
    }
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
