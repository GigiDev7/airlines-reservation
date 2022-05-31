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
    departureTime: {
      type: String,
      required: [true, "Departure time is required"],
    },
    arrivalTime: {
      type: String,
      required: [true, "Arrival time is required"],
    },
    airplane: {
      type: mongoose.Types.ObjectId,
      ref: "Airplane",
    },
  },
  {
    timestamps: true,
  }
);

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
