import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecordsComponent } from './admin-records.component';

describe('AdminRecordsComponent', () => {
  let component: AdminRecordsComponent;
  let fixture: ComponentFixture<AdminRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
