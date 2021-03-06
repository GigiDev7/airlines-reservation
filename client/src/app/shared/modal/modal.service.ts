import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isModalShown = new Subject<boolean>();
  modalFor!: string;
}
