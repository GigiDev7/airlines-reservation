const { checkSchema } = require("express-validator");

exports.ticketValidation = checkSchema({
  price: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Ticket price is required",
  },
  flight: {
    in: ["body"],
    isMongoId: true,
  },
});
