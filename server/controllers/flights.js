const {
  createFlight,
  findFlightAndDelete,
  findFlightAndUpdate,
  findFlights,
} = require("../services/flights");

const addFlight = async (req, res) => {
  try {
    const newFlight = await createFlight(req.body);
    res.status(200).json(newFlight);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateFlight = async (req, res) => {
  try {
    const { flightId } = req.params;
    const updatedFlight = await findFlightAndUpdate(flightId, req.body);
    res.status(201).json(updatedFlight);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteFlight = async (req, res) => {
  try {
    const { flightId } = req.params;
    await findFlightAndDelete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
};

const getFlights = async (req, res) => {
  try {
    const flights = await findFlights();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addFlight,
  updateFlight,
  deleteFlight,
  getFlights,
};
