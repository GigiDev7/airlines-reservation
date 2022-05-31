const {
  createAirplane,
  findAirplaneAndDelete,
  findAirplaneAndUpdate,
  findAirplanes,
} = require("../services/airplane");

const addAirplane = async (req, res) => {
  try {
    const newAirplane = await createAirplane(req.body);
    return res.status(200).json(newAirplane);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateAirplane = async (req, res) => {
  try {
    const { airplaneId } = req.params;
    const updatedAirplane = await findAirplaneAndUpdate(airplaneId, req.body);
    res.status(201).json(updatedAirplane);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteAirplane = async (req, res) => {
  try {
    const { airplaneId } = req.params;
    await findAirplaneAndDelete(airplaneId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAirplanes = async (req, res) => {
  try {
    const airplanes = await findAirplanes();
    res.status(200).json(airplanes);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addAirplane,
  updateAirplane,
  deleteAirplane,
  getAirplanes,
};
