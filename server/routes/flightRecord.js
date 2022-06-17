const express = require("express");
const {
  addFlightRecord,
  deleteFlightRecord,
  getFlightRecords,
  updateFlightRecord,
} = require("../controllers/flightRecord");
const { authGuard } = require("../middlewares/authGuard");
const { adminGuard } = require("../middlewares/adminGuard");
const {
  flightRecordValidation,
} = require("../middlewares/flightRecordValidators");
const {
  handleValidationErrors,
} = require("../middlewares/validationErrorsHandler");

const router = express.Router();

router.use(authGuard);

router
  .route("/")
  .get(getFlightRecords)
  .post(
    adminGuard,
    flightRecordValidation,
    handleValidationErrors,
    addFlightRecord
  );
router
  .route("/:recordId")
  .patch(adminGuard, updateFlightRecord)
  .delete(adminGuard, deleteFlightRecord);

module.exports = router;
