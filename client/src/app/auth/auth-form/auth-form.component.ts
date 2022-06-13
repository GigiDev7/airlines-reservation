import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent implements OnInit {
  @Input() authMode: string = '';
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  public registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    passwordConfirm: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
  });

  public registerError: string = '';
  public loginError: String = '';
  public isPasswordShown: boolean = false;

  public toggleShowPassword() {
    this.isPasswordShown = !this.isPasswordShown;
  }

  public handleSubmit(): any {
    if (this.authMode === 'login') {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => this.router.navigate(['']),
        error: (err) => (this.loginError = err.error.message),
      });
    } else {
      const {
        email,
        password,
        passwordConfirm,
        firstname,
        lastname,
        dateOfBirth,
      } = this.registerForm.value;
      if (password !== passwordConfirm) {
        return (this.registerError = 'Passwords do not match');
      }
      this.authService
        .register(email, password, firstname, lastname, dateOfBirth)
        .subscribe({
          next: () => this.router.navigate(['login']),
          error: (err) => (this.registerError = err.error.message),
        });
    }
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
}
