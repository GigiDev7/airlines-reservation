import { FlightRecordModel } from './flightRecordModel';

type SeatClass = 'business' | 'standart' | 'econom';

export interface TicketModel {
  _id: string;
  price: number;
  flightRecordId: FlightRecordModel;
  userId: string | null;
  ticketClass: SeatClass;
}
