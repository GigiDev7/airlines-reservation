const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  country: {
    type: String,
  },
  city: {
    type: String,
  },
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
