const Flight = require("../models/flightSchema");

const createFlight = async (flightData) => {
  return Flight.create(flightData);
};

const findFlightAndUpdate = async (flightId, flightData) => {
  return Flight.findByIdAndUpdate(flightId, flightData, { new: true });
};

const findFlightAndDelete = async (flightId) => {
  return Flight.findByIdAndDelete(flightId);
};

const findFlights = async () => {
  return Flight.find();
};

module.exports = {
  createFlight,
  findFlightAndDelete,
  findFlightAndUpdate,
  findFlights,
};
