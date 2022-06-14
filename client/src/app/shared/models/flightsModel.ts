import { AirplaneModel } from './airplaneModel';

export interface FlightModel {
  _id: string;
  departure: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  flightDuration: string;
  airplane: AirplaneModel;
}
