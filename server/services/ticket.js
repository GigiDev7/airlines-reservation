const Ticket = require("../models/ticketSchema");

const createTicket = async (ticketData) => {
  return Ticket.create(ticketData);
};

const findTicketAndUpdate = async (ticketId, ticketData) => {
  return Ticket.findByIdAndUpdate(ticketId, ticketData, { new: true });
};

const findTicketAndDelete = async (ticketId) => {
  return Ticket.findByIdAndDelete(ticketId);
};

const findTickets = async (sortBy, prices, recordId) => {
  const filters = ["gte", "gt", "lte", "lt"];
  const filterObject = {};

  if (!prices) {
    return Ticket.find({ flightRecordId: recordId }).sort(sortBy);
  }

  for (let filter of filters) {
    if (prices[filter]) {
      filterObject[`$${filter}`] = prices[filter];
    }
  }

  return Ticket.find({ price: filterObject, flightRecordId: recordId }).sort(
    sortBy
  );
};

module.exports = {
  createTicket,
  findTicketAndUpdate,
  findTicketAndDelete,
  findTickets,
};
