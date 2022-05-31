const Flight = require("../models/flightSchema");

const createFlight = async (flightData) => {
  return await Flight.create(flightData);
};

const findFlightAndUpdate = async (flightId, flightData) => {
  return await Flight.findByIdAndUpdate(flightId, flightData, { new: true });
};

const findFlightAndDelete = async (flightId) => {
  await Flight.findByIdAndDelete(flightId);
  return { message: "Flight deleted" };
};

const findFlights = async () => {
  return await Flight.find();
};

module.exports = {
  createFlight,
  findFlightAndDelete,
  findFlightAndUpdate,
  findFlights,
};
