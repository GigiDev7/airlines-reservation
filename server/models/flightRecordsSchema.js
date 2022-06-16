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
});

const FlightRecord = mongoose.model("FlightRecord", flightRecordSchema);

module.exports = FlightRecord;
