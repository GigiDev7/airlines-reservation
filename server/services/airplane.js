const Airplane = require("../models/airplaneSchema");
const { resultSeats } = require("../utils/seats");

const createAirplane = async (airplaneData) => {
  const { company, numberOfSeats } = airplaneData;
  const seats = resultSeats.slice(0, numberOfSeats);
  return Airplane.create({ company, seats });
};

const findAirplaneAndUpdate = async (airplaneId, airplaneData) => {
  const { company, numberOfSeats } = airplaneData;
  const seats = resultSeats.slice(0, numberOfSeats);
  return Airplane.findByIdAndUpdate(
    airplaneId,
    { company, seats },
    {
      new: true,
    }
  );
};

const findAirplaneAndDelete = async (airplaneId) => {
  return Airplane.findByIdAndDelete(airplaneId);
};

const findAirplanes = async (filterObject) => {
  return Airplane.aggregate([{ $match: filterObject }]);
};

module.exports = {
  createAirplane,
  findAirplaneAndDelete,
  findAirplaneAndUpdate,
  findAirplanes,
};
