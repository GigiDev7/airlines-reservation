const { checkSchema } = require("express-validator");

exports.flightRecordValidation = checkSchema({
  departureTime: {
    in: ["body"],
    isDate: true,
    errorMessage: "Departure time is required",
  },
  arrivalTime: {
    in: ["body"],
    isDate: true,
    errorMessage: "Arrival time is required",
  },
  airplaneId: {
    in: ["body"],
    isMongoId: true,
  },
  flightId: {
    in: ["body"],
    isMongoId: true,
  },
});
