const express = require("express");
const {
  addFlight,
  deleteFlight,
  getFlights,
  updateFlight,
} = require("../controllers/flights");
const { authGuard } = require("../middlewares/authGuard");
const { adminGuard } = require("../middlewares/adminGuard");
const { flightValidation } = require("../middlewares/flightValidators");
const {
  handleValidationErrors,
} = require("../middlewares/validationErrorsHandler");

const router = express.Router();

router.use(authGuard);

router
  .route("/")
  .get(getFlights)
  .post(adminGuard, flightValidation, handleValidationErrors, addFlight);
router
  .route("/:flightId")
  .put(adminGuard, flightValidation, handleValidationErrors, updateFlight)
  .delete(adminGuard, deleteFlight);

module.exports = router;
