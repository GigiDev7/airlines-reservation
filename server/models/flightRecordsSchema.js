const mongoose = require("mongoose");

const flightRecordSchema = new mongoose.Schema({
  flightId: {
    type: mongoose.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  airplaneId: {
    type: mongoose.Types.ObjectId,
    ref: "Airplane",
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  flightDuration: {
    type: String,
  },
});

flightRecordSchema.pre("save", function (next) {
  const hours = this.arrivalTime.getHours() - this.departureTime.getHours();
  const minutes =
    this.arrivalTime.getMinutes() - this.departureTime.getMinutes();
  this.flightDuration = `${hours}h ${minutes}min`;
  next();
});

const FlightRecord = mongoose.model("FlightRecord", flightRecordSchema);

module.exports = FlightRecord;
