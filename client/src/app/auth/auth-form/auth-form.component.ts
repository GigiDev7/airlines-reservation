import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.sass'],
})
export class AuthFormComponent implements OnInit {
  @Input() authMode: string = '';

  constructor() {}

  ngOnInit(): void {}
}
