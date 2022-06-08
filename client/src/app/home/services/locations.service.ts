import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LocationModel } from 'src/app/shared/models/locationModel';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locations: LocationModel[] = [];

  constructor(private http: HttpClient) {}

  public getLocations(): Observable<LocationModel[]> {
    return this.http.get('http://localhost:8000/locations').pipe(
      tap({
        next: (res: any) => {
          this.locations = res;
        },
      })
    );
  }
}
