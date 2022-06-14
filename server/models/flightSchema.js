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
      type: Date,
      required: [true, "Departure time is required"],
    },
    arrivalTime: {
      type: Date,
      required: [true, "Arrival time is required"],
    },
    flightDuration: {
      type: String,
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

flightSchema.pre("save", function (next) {
  const difHours = this.arrivalTime.getHours() - this.departureTime.getHours();
  const difMinutes =
    this.arrivalTime.getMinutes() - this.departureTime.getMinutes();
  this.flightDuration = `${difHours}:${difMinutes}`;
  next();
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
