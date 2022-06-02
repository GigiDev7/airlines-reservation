require("dotenv").config();
require("./db");
const Location = require("./models/locationSchema");
const countries = require("./locationsData");

(async () => {
  await Location.create(countries);
})();
