const Airplane = require("../models/airplaneSchema");

const createAirplane = async (airplaneData) => {
  return await Airplane.create(airplaneData);
};

const findAirplaneAndUpdate = async (airplaneId, airplaneData) => {
  return await Airplane.findByIdAndUpdate(airplaneId, airplaneData, {
    new: true,
  });
};

const findAirplaneAndDelete = async (airplaneId) => {
  await Airplane.findByIdAndDelete(airplaneId);
  return { message: "Airplane deleted" };
};

const findAirplanes = async () => {
  return await Airplane.find();
};

module.exports = {
  createAirplane,
  findAirplaneAndDelete,
  findAirplaneAndUpdate,
  findAirplanes,
};
