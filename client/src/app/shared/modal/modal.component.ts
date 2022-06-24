import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() modalText!: string;

  public closeModal() {
    this.modalService.isModalShown.next(false);
  }

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}
}
