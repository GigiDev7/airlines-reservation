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
  airline: {
    in: ["body"],
    isString: true,
  },
  flightId: {
    in: ["body"],
  },
});
