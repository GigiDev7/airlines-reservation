import { SearchFormComponent } from './search-form.component';
import {
  TestBed,
  ComponentFixtureAutoDetect,
  ComponentFixture,
} from '@angular/core/testing';
import { LocationService } from '../home/services/locations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';

describe('SearchForm Component', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let locationService: LocationService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(() => {
    const locationServiceStub = jasmine.createSpyObj('LocationService', {
      getLocations: of([{ city: 'city', country: 'country', _id: 'id' }]),
    });

    const routerSpy = jasmine.createSpyObj('Router', ['navigate'], {
      url: '/flights',
    });
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', [''], {
      queryParams: of({}),
    });

    TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      providers: [
        //{ provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: LocationService, useValue: locationServiceStub },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeSpy },
      ],
    });

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    locationService = TestBed.inject(LocationService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should update locations on init', () => {
    spyOn(component.flightForm, 'patchValue');
    expect(component.locations).toEqual([]);
    component.ngOnInit();
    expect(locationService.getLocations).toHaveBeenCalled();
    expect(component.locations).toEqual([
      { city: 'city', country: 'country', _id: 'id' },
    ]);
    expect(component.flightForm.patchValue).toHaveBeenCalled();
  });

  it('should toggle filters showing', () => {
    expect(component.isMoreFiltersShown).toBeFalsy();
    component.handleMoreFiltersShow();
    expect(component.isMoreFiltersShown).toBeTruthy();
  });

  it('should redirect after submitting form', () => {
    component.handleFlightFormSubmit();

    expect(router.navigate).toHaveBeenCalled();
  });
});
