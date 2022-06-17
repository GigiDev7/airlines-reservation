const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    departure: {
      type: String,
      required: [true, "Departure place is required"],
    },
    destination: {
      type: String,
      required: [true, "Destination place is required"],
    },
    /* flightDuration: {
      type: String,
    }, */
  },
  {
    timestamps: true,
  }
);

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
