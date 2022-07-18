import { AdminRecordsComponent } from './admin-records.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FlightService } from 'src/app/flights/flights.service';
import { AdminService } from '../admin.service';
import { LocationService } from 'src/app/home/services/locations.service';
import { ReloadService } from 'src/app/shared/reload/reload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('Admin Records Component', () => {
  let component: AdminRecordsComponent;
  let fixture: ComponentFixture<AdminRecordsComponent>;
  let flightService: FlightService;
  let adminService: AdminService;
  let locationService: LocationService;
  let reloadService: ReloadService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(() => {
    const flightServiceStub = jasmine.createSpyObj(
      'FlightService',
      {
        getAllRecords: of([{ record: 'record' }]),
        deleteFlightRecord: of(),
      },
      ['']
    );
    const adminServiceStub = jasmine.createSpyObj(
      'AdminService',
      {
        setNotificationMessage: (message: 'string') => {},
        showNotification: () => {},
      },
      {
        isRecordFormShown: new Subject(),
      }
    );
    const locationServiceStub = jasmine.createSpyObj(
      'LocationService',
      {
        getLocations: of([{ location: 'location' }]),
      },
      ['']
    );
    const reloadServiceStub = jasmine.createSpyObj(
      'ReloadService',
      ['reloadComponent'],
      ['']
    );
    const routerStub = jasmine.createSpyObj('Router', ['navigate'], ['']);
    const routeStub = jasmine.createSpyObj('ActivatedRoute', [''], {
      queryParams: of({}),
      snapshot: {
        queryParams: {
          page: 1,
        },
      },
    });

    TestBed.configureTestingModule({
      declarations: [AdminRecordsComponent],
      providers: [
        { provide: FlightService, useValue: flightServiceStub },
        { provide: AdminService, useValue: adminServiceStub },
        { provide: LocationService, useValue: locationServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: routeStub },
      ],
    });

    fixture = TestBed.createComponent(AdminRecordsComponent);
    component = fixture.componentInstance;
    flightService = TestBed.inject(FlightService);
    locationService = TestBed.inject(LocationService);
    adminService = TestBed.inject(AdminService);
    reloadService = TestBed.inject(ReloadService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should get locations and records on init', () => {
    component.ngOnInit();

    expect(flightService.getAllRecords).toHaveBeenCalled();
    expect(locationService.getLocations).toHaveBeenCalled();
    expect(component.isRecordFormShown).toBeFalse();
  });

  it('should change city based on location', () => {
    component.locationFor = 'departure';
    component.handleLocationClick('city');

    expect(component.departureCity).toEqual('city');

    component.locationFor = 'destination';
    component.handleLocationClick('city');

    expect(component.destinationCity).toEqual('city');
  });

  it('should delete record and navigate or reload component based on page', () => {
    component.handleDeleteRecord({
      _id: 'recordId',
      flightDay: new Date(),
      flight: {
        _id: 'id',
        arrivalTime: 'time',
        departureTime: 'time',
        departure: 'dep',
        destination: 'des',
        flightDuration: 'dur',
      },
      airplane: {
        _id: 'id',
        company: 'company',
        seats: [{ available: true, seatNumber: '1A' }],
      },
    });

    expect(flightService.deleteFlightRecord).toHaveBeenCalledWith('recordId');

    flightService.deleteFlightRecord('recordId').subscribe({
      next: () => {
        expect(adminService.setNotificationMessage).toHaveBeenCalledWith(
          'Record deleted'
        );
        expect(adminService.showNotification).toHaveBeenCalled();
      },
    });
  });
});
