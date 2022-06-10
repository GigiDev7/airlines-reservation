const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: [true, "Ticket price is required"],
    },
    flight: {
      type: mongoose.Types.ObjectId,
      ref: "Flight",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
