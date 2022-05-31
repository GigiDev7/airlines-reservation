const { findCountries } = require("../services/country");

exports.getCountries = async (req, res) => {
  try {
    const countries = await findCountries();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json(error);
  }
};
