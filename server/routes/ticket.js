const express = require("express");
const {
  addTicket,
  deleteTicket,
  updateTicket,
  getTickets,
} = require("../controllers/ticket");
const { authGuard } = require("../middlewares/authGuard");
const { adminGuard } = require("../middlewares/adminGuard");

const router = express.Router();

router.use(authGuard);

router.route("/").get(getTickets).post(adminGuard, addTicket);
router
  .route("/:ticketId")
  .put(adminGuard, updateTicket)
  .delete(adminGuard, deleteTicket);

module.exports = router;