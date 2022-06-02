const mongoose = require("mongoose");
const { SEATCLASS } = require("../utils/constants");

exports.seatSchema = new mongoose.Schema(
  {
    number: String,
    seatClass: {
      type: String,
      enum: SEATCLASS,
    },
    available: Boolean,
  },
  {
    _id: false,
  }
);
