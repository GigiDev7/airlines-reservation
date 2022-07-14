import { AdminAirplanesComponent } from './admin-airplanes.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AdminService } from '../admin.service';
import { ReloadService } from 'src/app/shared/reload/reload.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('Admin Airplanes Component', () => {
  let component: AdminAirplanesComponent;
  let fixture: ComponentFixture<AdminAirplanesComponent>;
  let adminService: AdminService;
  let reloadService: ReloadService;

  beforeEach(() => {
    const adminServiceStub = jasmine.createSpyObj(
      'AdminService',
      {
        getAirplanes: of([{ airplanes: 'airplanes' }]),
        deleteAirplane: of({}),
        setNotificationMessage: () => {},
        showNotification: () => {},
      },
      ['']
    );
    const reloadServiceStub = jasmine.createSpyObj(
      'ReloadService',
      {
        reloadComponent: () => {},
      },
      ['']
    );

    TestBed.configureTestingModule({
      declarations: [AdminAirplanesComponent],
      providers: [
        { provide: AdminService, useValue: adminServiceStub },
        { provide: ReloadService, useValue: reloadServiceStub },
      ],
    });

    fixture = TestBed.createComponent(AdminAirplanesComponent);
    component = fixture.componentInstance;

    adminService = TestBed.inject(AdminService);
    reloadService = TestBed.inject(ReloadService);
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should get airplanes on init', () => {
    component.ngOnInit();
    expect(adminService.getAirplanes).toHaveBeenCalled();

    adminService.getAirplanes().subscribe({
      next: (res) => {
        expect(res).toEqual([{ airplanes: 'airplanes' }]);
      },
    });
  });

  it('should reset component state when closing form', () => {
    component.isAirplaneFormShown = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.close'));
    el.triggerEventHandler('click', {});

    expect(component.isAirplaneFormShown).toBeFalse();
    expect(component.editingAirplane).toBeNull();
    expect(component.airplaneCompany).toBe('');
    expect(component.numberOfSeats).toBe(0);
  });

  it('should open form and update state when editing', () => {
    component.airplanes = [
      {
        _id: 'id',
        company: 'company',
        seats: [{ available: true, seatNumber: 'seat' }],
      },
    ];
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.edit'));
    el.triggerEventHandler('click', {});

    expect(component.isAirplaneFormShown).toBeTruthy();
  });

  it('should show notification and reload component when deleting', () => {
    component.handleDeleteAirplane('id');

    expect(adminService.deleteAirplane).toHaveBeenCalled();
    expect(adminService.setNotificationMessage).toHaveBeenCalled();
    expect(adminService.showNotification).toHaveBeenCalled();
    expect(reloadService.reloadComponent).toHaveBeenCalled();
  });
});
