const {
  createTicket,
  findTicketAndDelete,
  findTicketAndUpdate,
  findTickets,
  findTicketByUser,
  updateBookedTicket,
  updateReturnedTicket,
  findTicketsByRecord,
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

const getTicketsByUser = async (req, res, next) => {
  try {
    const ticket = await findTicketByUser(req.user._id);
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

const bookTicket = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      numberOfTickets,
      flightRecordId,
      ticketClass,
    } = req.body;
    const bookedTickets = await updateBookedTicket(
      req.user._id,
      firstname,
      lastname,
      numberOfTickets,
      flightRecordId,
      ticketClass
    );
    res.status(200).json(bookedTickets);
  } catch (error) {
    next(error);
  }
};

const returnTicket = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const ticket = await updateReturnedTicket(ticketId);
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

const getTicketsByRecord = async (req, res, next) => {
  try {
    const { flightRecordId } = req.params;
    const { total, tickets } = await findTicketsByRecord(
      flightRecordId,
      req.query
    );
    res.status(200).json({ total, tickets });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTicket,
  updateTicket,
  deleteTicket,
  getTickets,
  getTicketsByUser,
  bookTicket,
  returnTicket,
  getTicketsByRecord,
};
