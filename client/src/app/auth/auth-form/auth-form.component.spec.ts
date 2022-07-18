import { AuthFormComponent } from './auth-form.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

describe('AuthForm component', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceStub = jasmine.createSpyObj(
      'AuthService',
      {
        login: of({ user: 'user' }),
        register: of({ user: 'user' }),
      },
      ['']
    );

    const routerSpy = jasmine.createSpyObj('Router', ['navigate'], ['']);

    TestBed.configureTestingModule({
      declarations: [AuthFormComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
    expect(component.authMode).toBe('');
    expect(component.isPasswordShown).toBeFalsy();
    expect(component.registerError).toBeFalsy();
    expect(component.loginError).toBeFalsy();
  });

  it('should change isPassword shown when toggling', () => {
    component.toggleShowPassword();
    expect(component.isPasswordShown).toBeTruthy();
    component.toggleShowPassword();
    expect(component.isPasswordShown).toBeFalsy();
  });

  it('should login user on submit when authmode is login', () => {
    component.authMode = 'login';
    component.handleSubmit();
    expect(authService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['']);
    expect(component.loginError).toEqual('');
  });

  it('should register user on submit when authmode is register', () => {
    component.authMode = 'register';
    component.handleSubmit();
    expect(authService.register).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
    expect(component.registerError).toEqual('');
  });

  it('should update loginError when error happens on login', () => {
    component.authMode = 'login';

    authService.login = jasmine
      .createSpy()
      .and.returnValue(throwError({ error: { message: 'error' } }));

    component.handleSubmit();

    expect(component.loginError).toEqual('error');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('shpuld update registerError when error happens on register', () => {
    component.authMode = 'register';

    authService.register = jasmine
      .createSpy()
      .and.returnValue(throwError({ error: { message: 'error' } }));

    component.handleSubmit();

    expect(component.registerError).toEqual('error');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
