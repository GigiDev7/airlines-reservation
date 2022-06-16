import { AirplaneModel } from './airplaneModel';
import { FlightModel } from './flightsModel';

export interface FlightRecordModel {
  flightId: FlightModel;
  airplaneId: AirplaneModel;
  departureTime: Date;
  arrivalTime: Date;
}
