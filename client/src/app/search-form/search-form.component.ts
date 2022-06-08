import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.sass'],
})
export class SearchFormComponent implements OnInit {
  public handleInputFocus(element: HTMLInputElement): void {
    element.type = 'date';
  }
  public handleInputBlur(element: HTMLInputElement): void {
    element.type = 'text';
  }
  public minDate!: String;

  constructor() {}

  ngOnInit(): void {
    this.minDate = new Date().toISOString().split('T')[0];
  }
}
