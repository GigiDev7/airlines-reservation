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

  /* const { price, sort } = queryObject;
  const filters = ["gte", "gt", "lte", "lt"];
  const filterObject = {}; */

  const resultTickets = [];

  for (let record of records) {
    const businessTicket = await Ticket.findOne({
      flightRecordId: record._id,
      ticketClass: "business",
      userId: null,
    }).populate({
      path: "flightRecordId",
      populate: {
        path: "flightId",
      },
    });
    const standartTicket = await Ticket.findOne({
      flightRecordId: record._id,
      ticketClass: "standart",
      userId: null,
    }).populate({
      path: "flightRecordId",
      populate: {
        path: "flightId",
      },
    });
    const economTicket = await Ticket.findOne({
      flightRecordId: record._id,
      ticketClass: "econom",
      userId: null,
    }).populate({
      path: "flightRecordId",
      populate: {
        path: "flightId",
      },
    });

    if (businessTicket) resultTickets.push(businessTicket);
    if (standartTicket) resultTickets.push(standartTicket);
    if (economTicket) resultTickets.push(economTicket);
  }

  return resultTickets;

  /* if (!price) {
    return Ticket.find().populate({
      path: "flightRecordId",
      populate: {
        path: "airplaneId flightId",
      },
    });
  }

  for (let filter of filters) {
    if (price[filter]) {
      filterObject[`$${filter}`] = price[filter];
    }
  } */

  /*  return Ticket.find({ price: filterObject }).populate({
    path: "flightRecordId",
    populate: {
      path: "flightId airplaneId",
    },
  }); */
};

module.exports = {
  createTicket,
  findTicketAndUpdate,
  findTicketAndDelete,
  findTickets,
};
