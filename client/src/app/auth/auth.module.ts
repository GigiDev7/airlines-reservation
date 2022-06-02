import { NgModule } from '@angular/core';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AuthFormComponent, LoginComponent, RegisterComponent],
  imports: [ReactiveFormsModule, CommonModule],
  exports: [AuthFormComponent, LoginComponent, RegisterComponent],
})
export class AuthModule {}
