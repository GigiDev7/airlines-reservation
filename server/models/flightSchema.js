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
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    flightDuration: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

flightSchema.pre("save", function (next) {
  const hours = +this.arrivalTime.slice(0, 2) - +this.departureTime.slice(0, 2);
  const minutes = +this.arrivalTime.slice(3) - +this.departureTime.slice(3);
  this.flightDuration = `${hours}h ${minutes}min`;
  next();
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
