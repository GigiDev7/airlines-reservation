require("dotenv").config();
require("./db");
const Country = require("./models/countrySchema");
const countries = require("./countriesData");

(async () => {
  await Country.create(countries);
})();
