import { AirplaneModel } from './airplaneModel';

export interface FlightModel {
  _id: string;
  departure: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  flightDuration: string;
}
