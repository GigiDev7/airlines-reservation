const express = require("express");
const {
  addFlight,
  deleteFlight,
  getFlights,
  updateFlight,
} = require("../controllers/flights");
const { authGuard } = require("../middlewares/authGuard");
const { adminGuard } = require("../middlewares/adminGuard");

const router = express.Router();

router.use(authGuard);

router.route("/").get(getFlights).post(adminGuard, addFlight);
router
  .route("/:flightId")
  .put(adminGuard, updateFlight)
  .delete(adminGuard, deleteFlight);

module.exports = router;
