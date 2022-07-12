import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { url } from '../config/config';

const userData = {
  email: 'email',
  _id: 'id',
  firstname: 'firstname',
  lastname: 'lastname',
  role: 'role',
};

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should return user when logged in', (done: DoneFn) => {
    spyOn(service, 'setUser');

    service.login('email', 'password').subscribe({
      next: (res) => {
        expect(res).toEqual(userData);
        expect(service.setUser).toHaveBeenCalledWith(userData);
        done();
      },
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/user/login`,
    });
    req.flush(userData);
  });
});
