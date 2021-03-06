const {
  createFlight,
  findFlightAndDelete,
  findFlightAndUpdate,
  findFlights,
} = require("../services/flights");

const addFlight = async (req, res, next) => {
  try {
    const newFlight = await createFlight(req.body);
    res.status(200).json(newFlight);
  } catch (error) {
    next(error);
  }
};

const updateFlight = async (req, res, next) => {
  try {
    const { flightId } = req.params;
    const updatedFlight = await findFlightAndUpdate(flightId, req.body);
    res.status(201).json(updatedFlight);
  } catch (error) {
    next(error);
  }
};

const deleteFlight = async (req, res, next) => {
  try {
    const { flightId } = req.params;
    const deletedFlight = await findFlightAndDelete(flightId);
    res.status(200).json(deletedFlight);
  } catch (error) {
    next(error);
  }
};

const getFlights = async (req, res, next) => {
  try {
    const filterObject = {};
    const { destination, departure, sort } = req.query;
    if (destination) filterObject.destination = destination;
    if (departure) filterObject.departure = departure;
    const flights = await findFlights(filterObject, sort);
    res.status(200).json(flights);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addFlight,
  updateFlight,
  deleteFlight,
  getFlights,
};
