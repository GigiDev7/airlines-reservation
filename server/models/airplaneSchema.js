const mongoose = require("mongoose");
const SeatSchema = require("./seatSchema");
const { resultSeats } = require("../utils/seats");

const airplaneSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Airplane company is required"],
    },
    seats: {
      type: [SeatSchema],
      default: resultSeats,
    },
  },
  {
    timestamps: true,
  }
);

const Airplane = mongoose.model("Airplane", airplaneSchema);

module.exports = Airplane;
