import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFlightsComponent } from './admin/admin-flights/admin-flights.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { AuthPageRestrict } from './auth/authPageRestrict.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FlightsComponent } from './flights/flights.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthPageRestrict] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthPageRestrict],
  },
  { path: 'flights', component: FlightsComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'flights',
        component: AdminFlightsComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
