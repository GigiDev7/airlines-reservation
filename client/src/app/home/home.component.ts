import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public imageIndx: number = 1;
  private imageInterval!: ReturnType<typeof setInterval>;

  constructor() {}

  ngOnInit(): void {
    this.imageInterval = setInterval(() => {
      if (this.imageIndx === 3) {
        this.imageIndx = 1;
      } else {
        this.imageIndx++;
      }
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.imageInterval);
  }
}
