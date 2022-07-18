import { AdminFlightsComponent } from './admin-flights.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FlightService } from 'src/app/flights/flights.service';
import { LocationService } from 'src/app/home/services/locations.service';
import { AdminService } from '../admin.service';
import { ReloadService } from 'src/app/shared/reload/reload.service';
import { of, Subject } from 'rxjs';

describe('Admin FLights Component', () => {
  let component: AdminFlightsComponent;
  let fixture: ComponentFixture<AdminFlightsComponent>;
  let flightService: FlightService;
  let locationService: LocationService;
  let adminService: AdminService;
  let reloadService: ReloadService;

  beforeEach(() => {
    const flightServiceStub = jasmine.createSpyObj(
      'FlightService',
      {
        getFlights: of([]),
        deleteFlight: of(),
      },
      ['']
    );
    const locationServiceStub = jasmine.createSpyObj(
      'LocationService',
      {
        getLocations: of([]),
      },
      ['']
    );
    const adminServiceStub = jasmine.createSpyObj('AdminService', [''], {
      isRecordFormShown: new Subject(),
      isFlightFormShown: new Subject(),
      setNotificationMessage: (message: string) => {},
      showNotification: () => {},
    });
    const reloadServiceStub = jasmine.createSpyObj('RealoadService', [''], {
      reloadComponent: () => {},
    });

    TestBed.configureTestingModule({
      declarations: [AdminFlightsComponent],
      providers: [
        { provide: FlightService, useValue: flightServiceStub },
        { provide: LocationService, useValue: locationServiceStub },
        { provide: AdminService, useValue: adminServiceStub },
        { provide: ReloadService, useValue: reloadServiceStub },
      ],
    });

    fixture = TestBed.createComponent(AdminFlightsComponent);
    component = fixture.componentInstance;
    flightService = TestBed.inject(FlightService);
    locationService = TestBed.inject(LocationService);
    adminService = TestBed.inject(AdminService);
    reloadService = TestBed.inject(ReloadService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get flights and locations on init', () => {
    component.ngOnInit();
    adminService.isFlightFormShown.next(true);
    adminService.isRecordFormShown.next(true);

    expect(flightService.getFlights).toHaveBeenCalled();
    expect(locationService.getLocations).toHaveBeenCalled();
    expect(component.isFlightFormShown).toBeTruthy();
    expect(component.isRecordFormShown).toBeTruthy();
  });

  it('should update city state based on departure and destination', () => {
    component.locationFor = 'departure';
    component.handleLocationClick('city');
    expect(component.departureCity).toEqual('city');

    component.locationFor = 'destination';
    component.handleLocationClick('city');
    expect(component.destinationCity).toEqual('city');
  });

  it('should update editing flight in admin service', () => {
    component.handleEditFlight({
      arrivalTime: '12',
      _id: 'id',
      departure: 'dep',
      departureTime: '12',
      destination: 'des',
      flightDuration: 'dur',
    });

    expect(adminService.isFlightFormShown).toBeTruthy();
    expect(adminService.editingFlight).toEqual({
      arrivalTime: '12',
      _id: 'id',
      departure: 'dep',
      departureTime: '12',
      destination: 'des',
      flightDuration: 'dur',
    });
  });

  it('should delete flight, show notification, reload component', () => {
    component.handleDeleteFlight('id');

    expect(flightService.deleteFlight).toHaveBeenCalledWith('id');
    flightService.deleteFlight('id').subscribe({
      next: () => {
        expect(adminService.setNotificationMessage).toHaveBeenCalledWith(
          'Flight deleted'
        );
        expect(adminService.showNotification).toHaveBeenCalled();
        expect(reloadService.reloadComponent).toHaveBeenCalled();
      },
    });
  });
});
