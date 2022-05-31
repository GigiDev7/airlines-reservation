const Ticket = require("../models/ticketSchema");

const createTicket = async (ticketData) => {
  return await Ticket.create(ticketData);
};

const findTicketAndUpdate = async (ticketId, ticketData) => {
  return await Ticket.findByIdAndUpdate(ticketId, ticketData, { new: true });
};

const findTicketAndDelete = async (ticketId) => {
  await Ticket.findByIdAndDelete(ticketId);
  return { message: "Ticket deleted" };
};

const findTickets = async () => {
  return await Ticket.find();
};

module.exports = {
  createTicket,
  findTicketAndUpdate,
  findTicketAndDelete,
  findTickets,
};
