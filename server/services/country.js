const Country = require("../models/countrySchema");

exports.findCountries = async () => {
  return await Country.find();
};
