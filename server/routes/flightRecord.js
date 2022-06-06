const express = require("express");
const {
  addFlightRecord,
  deleteFlightRecord,
  getFlightRecords,
  updateFlightRecord,
} = require("../controllers/flightRecord");
const { authGuard } = require("../middlewares/authGuard");
const { adminGuard } = require("../middlewares/adminGuard");

const router = express.Router();

router.use(authGuard, adminGuard);

router.route("/").get(getFlightRecords).post(addFlightRecord);
router.route("/:recordId").put(updateFlightRecord).delete(deleteFlightRecord);

module.exports = router;
