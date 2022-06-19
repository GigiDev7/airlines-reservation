import { Component, OnInit } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserModel } from 'src/app/shared/models/userModel';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  public user!: UserModel;
  public isSideBarClosed: boolean = false;

  public matchOptions: IsActiveMatchOptions = {
    queryParams: 'ignored',
    matrixParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  };

  public handleSideBarToggle(): void {
    this.isSideBarClosed = !this.isSideBarClosed;
  }

  public handleLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
}
