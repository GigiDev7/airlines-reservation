const { findLocations } = require("../services/location");

exports.getLocations = async (req, res, next) => {
  try {
    const locations = await findLocations();
    res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};
