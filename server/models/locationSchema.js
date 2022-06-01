const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  country: {
    type: String,
  },
  city: {
    type: String,
  },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
