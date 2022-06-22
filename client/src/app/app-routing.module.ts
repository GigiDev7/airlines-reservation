import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAirplanesComponent } from './admin/admin-airplanes/admin-airplanes.component';
import { AdminFlightsComponent } from './admin/admin-flights/admin-flights.component';
import { AdminRecordsComponent } from './admin/admin-records/admin-records.component';
import { AdminTicketsComponent } from './admin/admin-tickets/admin-tickets.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { AuthPageRestrict } from './auth/authPageRestrict.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FlightsComponent } from './flights/flights.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TicketsComponent } from './tickets/tickets.component';

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
    path: 'tickets/:recordId',
    component: TicketsComponent,
    canActivate: [AuthGuard],
  },
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
      {
        path: 'records',
        component: AdminRecordsComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'airplanes',
        component: AdminAirplanesComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'tickets/recordId',
        component: AdminTicketsComponent,
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
