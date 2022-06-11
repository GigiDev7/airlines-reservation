import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserModel } from '../shared/models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return !!user;
  }

  public login(email: string, password: string): Observable<UserModel> {
    return this.http
      .post('http://localhost:8000/user/login', { email, password })
      .pipe(
        tap((res: any) => {
          this.setUser(res);
        })
      );
  }

  public register(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    dateOfBirth: Date
  ) {
    return this.http.post('http://localhost:8000/user/register', {
      email,
      password,
      firstname,
      lastname,
      dateOfBirth,
    });
  }

  private setUser(userData: UserModel): void {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  public logout(): void {
    localStorage.removeItem('user');
  }
}
