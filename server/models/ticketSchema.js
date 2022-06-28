const mongoose = require("mongoose");
const { SEATCLASS } = require("../utils/constants");

const ticketSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: [true, "Ticket price is required"],
    },
    flightRecordId: {
      type: mongoose.Types.ObjectId,
      ref: "FlightRecord",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
    ticketClass: {
      type: String,
      enum: SEATCLASS,
    },
    userData: {
      type: {
        firstname: String,
        lastname: String,
      },
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
