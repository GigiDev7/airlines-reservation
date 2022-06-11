import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserModel } from '../shared/models/userModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public user: UserModel | null = null;
  public isWindowShown: boolean = false;

  public toggleWindow() {
    this.isWindowShown = !this.isWindowShown;
  }

  public handleLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) this.user = JSON.parse(user);
  }
}
