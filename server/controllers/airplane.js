const {
  createAirplane,
  findAirplaneAndDelete,
  findAirplaneAndUpdate,
  findAirplanes,
} = require("../services/airplane");

const { validationResult } = require("express-validator");

const addAirplane = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newAirplane = await createAirplane(req.body);
    return res.status(200).json(newAirplane);
  } catch (error) {
    next(error);
  }
};

const updateAirplane = async (req, res, next) => {
  try {
    const { airplaneId } = req.params;
    const updatedAirplane = await findAirplaneAndUpdate(airplaneId, req.body);
    res.status(201).json(updatedAirplane);
  } catch (error) {
    next(error);
  }
};

const deleteAirplane = async (req, res, next) => {
  try {
    const { airplaneId } = req.params;
    const deletedAirplane = await findAirplaneAndDelete(airplaneId);
    res.status(204).json(deletedAirplane);
  } catch (error) {
    next(error);
  }
};

const getAirplanes = async (req, res, next) => {
  try {
    const { company } = req.query;
    const filterObject = company ? { company } : {};
    const airplanes = await findAirplanes(filterObject);
    res.status(200).json(airplanes);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAirplane,
  updateAirplane,
  deleteAirplane,
  getAirplanes,
};
