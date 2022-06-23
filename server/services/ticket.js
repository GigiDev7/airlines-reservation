const Ticket = require("../models/ticketSchema");
const { findFlightRecords } = require("./flightRecord");

const createTicket = async (ticketData) => {
  return Ticket.create(ticketData);
};

const findTicketAndUpdate = async (ticketId, ticketData) => {
  return Ticket.findByIdAndUpdate(ticketId, ticketData, { new: true });
};

const findTicketAndDelete = async (ticketId) => {
  return Ticket.findByIdAndDelete(ticketId);
};

const findTickets = async (queryObject) => {
  const { count, records } = await findFlightRecords(queryObject);

  const filterObject = {};

  const { price } = queryObject;
  const filters = ["gte", "gt", "lte", "lt"];
  const filterPrice = {};
  if (price) {
    for (let filter of filters) {
      if (price[filter]) {
        filterPrice[`$${filter}`] = price[filter];
      }
    }
    filterObject.price = filterPrice;
  }

  const filterClass = queryObject.ticketClass
    ? queryObject.ticketClass.split(",")
    : ["business", "standart", "econom"];

  const resultTickets = [];

  for (let record of records) {
    for (let ticketClass of filterClass) {
      const ticket = await Ticket.findOne({
        flightRecordId: record._id,
        ticketClass,
        userId: null,
        ...filterObject,
      }).populate({
        path: "flightRecordId",
        populate: {
          path: "flightId",
        },
      });

      if (ticket) resultTickets.push(ticket);
    }
  }

  return resultTickets;
};

module.exports = {
  createTicket,
  findTicketAndUpdate,
  findTicketAndDelete,
  findTickets,
};
