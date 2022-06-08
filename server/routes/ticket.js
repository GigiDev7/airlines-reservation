const express = require("express");
const {
  addTicket,
  deleteTicket,
  updateTicket,
  getTickets,
} = require("../controllers/ticket");
const { authGuard } = require("../middlewares/authGuard");
const { adminGuard } = require("../middlewares/adminGuard");
const { ticketValidation } = require("../middlewares/ticketValidators");
const {
  handleValidationErrors,
} = require("../middlewares/validationErrorsHandler");

const router = express.Router();

router.use(authGuard);

router
  .route("/")
  .get(getTickets)
  .post(adminGuard, ticketValidation, handleValidationErrors, addTicket);
router
  .route("/:ticketId")
  .put(adminGuard, ticketValidation, handleValidationErrors, updateTicket)
  .delete(adminGuard, deleteTicket);

module.exports = router;
