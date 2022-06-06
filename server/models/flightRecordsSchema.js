const mongoose = require("mongoose");

const flightRecordSchema = new mongoose.Schema({
  flightId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  airplaneId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  flightDay: {
    type: Date,
    required: true,
  },
});

const FlightRecord = mongoose.model("FlightRecord", flightRecordSchema);

module.exports = FlightRecord;
