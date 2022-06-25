const Ticket = require("../models/ticketSchema");
const { findFlightRecords } = require("./flightRecord");

class ReturnException {
  constructor(message) {
    this.message = message;
    this.name = "ReturnException";
  }
}

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
  if (price?.gte && price?.lte) {
    filterObject.price = {
      $gte: price.gte,
      $lte: price.lte,
    };
  }

  /* const { price } = queryObject;
  const filters = ["gte", "gt", "lte", "lt"];
  const filterPrice = {};
  if (price) {
    for (let filter of filters) {
      if (price[filter]) {
        filterPrice[`$${filter}`] = price[filter];
      }
    }
    filterObject.price = filterPrice;
  } */

  const filterClass = queryObject.ticketClass
    ? queryObject.ticketClass.split(",")
    : ["business", "standart", "econom"];

  const resultTickets = [];

  for (let record of records) {
    for (let ticketClass of filterClass) {
      const tickets = await Ticket.find({
        flightRecordId: record._id,
        ticketClass,
        userId: null,
        ...filterObject,
      }).populate({
        path: "flightRecordId",
        populate: {
          path: "flightId airplaneId",
        },
      });

      if (tickets.length)
        resultTickets.push({ ...tickets[0]._doc, available: tickets.length });
    }
  }

  return resultTickets;
};

const findTicketByUser = async (userId) => {
  return Ticket.findOne({ userId }).populate({
    path: "flightRecordId",
    populate: {
      path: "flightId airplaneId",
    },
  });
};

const updateBookedTicket = async (userId, flightRecordId, ticketClass) => {
  return Ticket.findOneAndUpdate(
    { flightRecordId, ticketClass, userId: null },
    { userId },
    { new: true }
  );
};

const updateReturnedTicket = async (ticketId) => {
  const ticket = await Ticket.findById(ticketId).populate("flightRecordId");
  const lastDayToReturn = new Date(
    new Date(ticket.flightRecordId.flightDay) -
      1000 * 60 * 60 * process.env.RETURN_EXPIRATION
  );

  if (lastDayToReturn < new Date()) {
    throw new ReturnException("Return time expired");
  }

  return Ticket.findByIdAndUpdate(ticketId, { userId: null }, { new: true });
};

module.exports = {
  createTicket,
  findTicketAndUpdate,
  findTicketAndDelete,
  findTickets,
  findTicketByUser,
  updateBookedTicket,
  updateReturnedTicket,
};
