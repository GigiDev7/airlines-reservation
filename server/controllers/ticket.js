const {
  createTicket,
  findTicketAndDelete,
  findTicketAndUpdate,
  findTickets,
} = require("../services/ticket");

const addTicket = async (req, res) => {
  try {
    const newTicket = await createTicket(req.body);
    res.status(200).json(newTicket);
  } catch (error) {
    res.status(500).json(err);
  }
};

const updateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const updatedTicket = await findTicketAndUpdate(ticketId, req.body);
    res.status(201).json(updatedTicket);
  } catch (error) {
    res.status(500).json(err);
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    await findTicketAndDelete(ticketId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await findTickets();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addTicket,
  updateTicket,
  deleteTicket,
  getTickets,
};
