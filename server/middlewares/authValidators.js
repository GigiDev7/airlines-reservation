const { checkSchema } = require("express-validator");

exports.loginValidation = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Invalid email",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 6 },
      errorMessage: "Password should be at least 6 chars long",
    },
  },
});

exports.registerValidation = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Invalid email",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 6 },
      errorMessage: "Password should be at least 6 chars long",
    },
  },
  firstname: {
    in: ["body"],
    isString: true,
    errorMessage: "Firstname is required",
  },
  lastname: {
    in: ["body"],
    isString: true,
    errorMessage: "Lastname is required",
  },
});
