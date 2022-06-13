import { SeatModel } from './seatModel';

export interface AirplaneModel {
  _id: string;
  company: string;
  seats: SeatModel[];
}
