import { FlightRecordModel } from './flightRecordModel';

type SeatClass = 'business' | 'standart' | 'econom';

export interface TicketModel {
  _id: string;
  price: number;
  record: FlightRecordModel;
  userId: string | null;
  ticketClass: SeatClass;
  available: number;
  flightRecordId?: FlightRecordModel;
}
