const Airplane = require("../models/airplaneSchema");

const createAirplane = async (airplaneData) => {
  return Airplane.create(airplaneData);
};

const findAirplaneAndUpdate = async (airplaneId, airplaneData) => {
  return Airplane.findByIdAndUpdate(airplaneId, airplaneData, {
    new: true,
  });
};

const findAirplaneAndDelete = async (airplaneId) => {
  return Airplane.findByIdAndDelete(airplaneId);
};

const findAirplanes = async () => {
  return Airplane.find();
};

module.exports = {
  createAirplane,
  findAirplaneAndDelete,
  findAirplaneAndUpdate,
  findAirplanes,
};
