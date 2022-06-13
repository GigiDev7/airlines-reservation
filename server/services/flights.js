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

const findFlights = async (filterObject, departureTime, sortBy) => {
  return Flight.find({
    ...filterObject,
    departureTime: { $eq: departureTime },
  })
    .sort(sortBy)
    .populate("airplane");
};

module.exports = {
  createFlight,
  findFlightAndDelete,
  findFlightAndUpdate,
  findFlights,
};
