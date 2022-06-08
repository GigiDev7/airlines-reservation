const express = require("express");
const {
  addAirplane,
  deleteAirplane,
  getAirplanes,
  updateAirplane,
} = require("../controllers/airplane");
const { authGuard } = require("../middlewares/authGuard");
const { adminGuard } = require("../middlewares/adminGuard");
const { airplaneValidation } = require("../middlewares/airplaneValidators");
const {
  handleValidationErrors,
} = require("../middlewares/validationErrorsHandler");

const router = express.Router();

router.use(authGuard);

router
  .route("/")
  .get(getAirplanes)
  .post(adminGuard, airplaneValidation, handleValidationErrors, addAirplane);
router
  .route("/:airplaneId")
  .put(adminGuard, updateAirplane)
  .delete(adminGuard, deleteAirplane);

module.exports = router;
