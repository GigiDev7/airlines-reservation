import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass'],
})
export class PaginatorComponent implements OnInit {
  public page: number = 1;

  public handlePreviousPageClick() {
    this.page--;
  }

  public handleNextPageClick() {
    this.page++;
  }

  constructor() {}

  ngOnInit(): void {}
}
