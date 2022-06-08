const { checkSchema } = require("express-validator");

exports.airplaneValidation = checkSchema({
  company: {
    in: ["body"],
    isString: true,
    errorMessage: "Airplane company required",
  },
});
