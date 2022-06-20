const Flight = require("../models/flightSchema");
const FlightRecord = require("../models/flightRecordsSchema");

const createFlight = async (flightData) => {
  return Flight.create(flightData);
};

const findFlightAndUpdate = async (flightId, flightData) => {
  const hours =
    +flightData.arrivalTime.slice(0, 3) - +flightData.departureTime.slice(0, 3);
  const minutes =
    +flightData.arrivalTime.slice(3) - +flightData.departureTime.slice(3);
  const flightDuration = `${hours}h ${minutes}min`;

  return Flight.findByIdAndUpdate(
    flightId,
    { ...flightData, flightDuration },
    { new: true }
  );
};

const findFlightAndDelete = async (flightId) => {
  await FlightRecord.deleteMany({ flightId });

  return Flight.findByIdAndDelete(flightId);
};

const findFlights = async (filterObject, sortBy) => {
  return Flight.find({
    ...filterObject,
  }).sort(sortBy);
};

module.exports = {
  createFlight,
  findFlightAndDelete,
  findFlightAndUpdate,
  findFlights,
};
