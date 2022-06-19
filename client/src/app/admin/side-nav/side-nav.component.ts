import { Component, OnInit } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
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

  constructor() {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
}
