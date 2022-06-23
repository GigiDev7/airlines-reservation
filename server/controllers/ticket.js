const {
  createTicket,
  findTicketAndDelete,
  findTicketAndUpdate,
  findTickets,
} = require("../services/ticket");

const addTicket = async (req, res, next) => {
  try {
    const newTicket = await createTicket(req.body);
    res.status(200).json(newTicket);
  } catch (error) {
    next(error);
  }
};

const updateTicket = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const updatedTicket = await findTicketAndUpdate(ticketId, req.body);
    res.status(201).json(updatedTicket);
  } catch (error) {
    next(error);
  }
};

const deleteTicket = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const deletedTicket = await findTicketAndDelete(ticketId);
    res.status(200).json(deletedTicket);
  } catch (error) {
    next(error);
  }
};

const getTickets = async (req, res, next) => {
  try {
    //const { sort, price } = req.query;
    //const { recordId } = req.params;
    const tickets = await findTickets(req.query);
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTicket,
  updateTicket,
  deleteTicket,
  getTickets,
};
