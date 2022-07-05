import { AirplaneModel } from './airplaneModel';
import { FlightModel } from './flightsModel';

export interface FlightRecordModel {
  _id: string;
  flight: FlightModel;
  airplane: AirplaneModel;
  flightDay: Date;
  flightId?: FlightModel;
  airplaneId?: AirplaneModel;
}
