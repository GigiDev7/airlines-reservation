import { Component, OnInit } from '@angular/core';
import { UserModel } from '../shared/models/userModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  public user: UserModel | null = null;

  constructor() {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) this.user = JSON.parse(user);
  }
}
