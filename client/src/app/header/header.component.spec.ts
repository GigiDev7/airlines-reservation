import { HeaderComponent } from './header.component';
import {
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect,
} from '@angular/core/testing';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceStub = {
      logout: () => {},
    };

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerSpy },
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
    expect(component.user).toEqual(null);
    expect(component.isWindowShown).toBe(false);
  });

  it('should toggle window state', () => {
    component.toggleWindow();
    expect(component.isWindowShown).toBe(true);

    component.toggleWindow();
    expect(component.isWindowShown).toBe(false);
  });

  it('should log out', () => {
    spyOn(authService, 'logout');
    component.handleLogout();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should get user from localstorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('userData');
    spyOn(JSON, 'parse');
    component.ngOnInit();
    expect(localStorage.getItem).toHaveBeenCalledWith('user');
    expect(component.user).not.toBe(null);
  });
});
