import { BookingsComponent } from './bookings.component';

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ModalService } from '../shared/modal/modal.service';
import { TicketService } from '../tickets/tickets.service';
import { of, Subject } from 'rxjs';

describe('Bookings Component', () => {
  let component: BookingsComponent;
  let fixture: ComponentFixture<BookingsComponent>;
  let modalService: ModalService;
  let ticketService: TicketService;

  beforeEach(() => {
    const modalServiceStub = jasmine.createSpyObj('ModalService', [''], {
      isModalShown: new Subject(),
    });
    const ticketServiceStub = jasmine.createSpyObj(
      'TicketService',
      {
        getTicketsByUser: of([{ ticket: 'ticket' }]),
      },
      ['']
    );

    TestBed.configureTestingModule({
      declarations: [BookingsComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceStub },
        { provide: TicketService, useValue: ticketServiceStub },
      ],
    });

    modalService = TestBed.inject(ModalService);
    ticketService = TestBed.inject(TicketService);

    fixture = TestBed.createComponent(BookingsComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get user tickets on init', () => {
    component.ngOnInit();

    expect(ticketService.getTicketsByUser).toHaveBeenCalled();
  });
});
