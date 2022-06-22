type SeatClass = 'business' | 'standart' | 'econom';

export interface TicketModel {
  _id: string;
  price: number;
  flightRecordId: string;
  userId: string | null;
  ticketClass: SeatClass;
}
