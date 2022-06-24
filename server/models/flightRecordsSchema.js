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
  flightDay: {
    type: Date,
    requried: true,
  },
});

const FlightRecord = mongoose.model("FlightRecord", flightRecordSchema);

module.exports = FlightRecord;
