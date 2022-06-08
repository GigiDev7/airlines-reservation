const { checkSchema } = require("express-validator");

exports.flightValidation = checkSchema({
  departure: {
    in: ["body"],
    isString: true,
    errorMessage: "Departure place is required",
  },
  destination: {
    in: ["body"],
    isString: true,
    errorMessage: "Destination place is required",
  },
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
  airplane: {
    in: ["body"],
    isMongoId: true,
  },
});
