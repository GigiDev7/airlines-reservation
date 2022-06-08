const express = require("express");
const {
  register,
  login,
  deleteUser,
  updateUser,
} = require("../controllers/user");
const { authGuard } = require("../middlewares/authGuard");
const { adminGuard } = require("../middlewares/adminGuard");
const {
  loginValidation,
  registerValidation,
} = require("../middlewares/authValidators");
const {
  handleValidationErrors,
} = require("../middlewares/validationErrorsHandler");

const router = express.Router();

router.route("/login").post(loginValidation, handleValidationErrors, login);
router
  .route("/register")
  .post(registerValidation, handleValidationErrors, register);
router.route("/delete/:userId").delete(authGuard, adminGuard, deleteUser);
router.route("/update/:userId").put(authGuard, adminGuard, updateUser);

module.exports = router;
