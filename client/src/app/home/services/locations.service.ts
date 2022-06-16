import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationModel } from 'src/app/shared/models/locationModel';
import { Observable, tap } from 'rxjs';

import { url } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locations: LocationModel[] = [];

  constructor(private http: HttpClient) {}

  public getLocations(): Observable<LocationModel[]> {
    return this.http.get(`${url}/locations`).pipe(
      tap({
        next: (res: any) => {
          this.locations = res;
        },
      })
    );
  }
}
