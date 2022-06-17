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
});
