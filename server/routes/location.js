const express = require("express");
const { getLocations } = require("../controllers/location");

const router = express.Router();

router.route("/").get(getLocations);

module.exports = router;
