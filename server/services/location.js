const Location = require("../models/locationSchema");

exports.findLocations = async () => {
  return Location.find();
};
