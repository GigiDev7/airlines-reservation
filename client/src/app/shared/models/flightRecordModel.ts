import { AirplaneModel } from './airplaneModel';
import { FlightModel } from './flightsModel';

export interface FlightRecordModel {
  _id: string;
  flightId: FlightModel;
  airplaneId: AirplaneModel;
  flightDay: Date;
}
