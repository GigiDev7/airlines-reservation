const mongoose = require("mongoose");
const { SEATCLASS } = require("../utils/constants");

exports.seatSchema = new mongoose.Schema(
  {
    seatNumber: String,
    available: Boolean,
  },
  {
    _id: false,
  }
);
