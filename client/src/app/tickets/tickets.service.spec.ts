import { TicketService } from './tickets.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { url } from '../config/config';
import { of } from 'rxjs';

describe('Ticket Service', () => {
  let service: TicketService;
  let httpController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(TicketService);
    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should return tickets by user', (done: DoneFn) => {
    service.getTicketsByUser().subscribe({
      next: (res) => {
        expect(res).toEqual([{ ticket: 'ticket' }]);
        done();
      },
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/tickets/user`,
    });
    req.flush([{ ticket: 'ticket' }]);
    httpController.verify();
  });

  it('should return tickets when getting all tickets', () => {
    service
      .getTickets('departure', 'destination', new Date(), new Date())
      .subscribe({
        next: (res) => {
          expect(res).toEqual([{ tickets: 'tickets' }]);
        },
      });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/tickets?departure=departure&destination=destination&departureStart=${new Date()}&departureEnd=${new Date()}&airline[in]=&ticketClass=&price[gte]=&price[lte]=&sort=flightDay&availableTickets=1`,
    });
    req.flush([{ tickets: 'tickets' }]);
    httpController.verify();
  });

  it('should update ticket and return updated ticket', () => {
    service.updateTicket('ticketId', 100, 'ticketCLlass').subscribe({
      next: (res) => {
        expect(res).toEqual({ ticket: 'ticket' });
      },
    });

    const req = httpController.expectOne({
      method: 'PATCH',
      url: `${url}/tickets/ticketId`,
    });

    req.flush({ ticket: 'ticket' });
    httpController.verify();
  });
});
