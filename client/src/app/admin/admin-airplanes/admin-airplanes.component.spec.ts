import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAirplanesComponent } from './admin-airplanes.component';

describe('AdminAirplanesComponent', () => {
  let component: AdminAirplanesComponent;
  let fixture: ComponentFixture<AdminAirplanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAirplanesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAirplanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
