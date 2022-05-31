const mongoose = require("mongoose");

const airplaneSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Airplane company is required"],
    },
    seats: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Airplane = mongoose.model("Airplane", airplaneSchema);

module.exports = Airplane;
