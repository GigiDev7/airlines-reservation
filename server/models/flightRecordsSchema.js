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
  businessTickets: {
    type: Number,
  },
  standartTickets: {
    type: Number,
  },
  economTickets: {
    type: Number,
  },
});

const FlightRecord = mongoose.model("FlightRecord", flightRecordSchema);

module.exports = FlightRecord;
