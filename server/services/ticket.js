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
  /* const { count, records } = await findFlightRecords(queryObject);
  const { sort } = queryObject;
  const availableTickets = queryObject.availableTickets || 1;

  const filterObject = {};

  const { price } = queryObject;
  if (price?.gte && price?.lte) {
    filterObject.price = {
      $gte: price.gte,
      $lte: price.lte,
    };
  } */

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

  /*  const filterClass = queryObject.ticketClass
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

      if (tickets.length && tickets.length >= availableTickets)
        resultTickets.push({ ...tickets[0]._doc, available: tickets.length });
    }
  } */

  /* if (sort === "flightDay") return resultTickets;
  if (sort === "price") return resultTickets.sort((a, b) => b.price - a.price);
  if (sort === "ticketClass") {
    return resultTickets.sort((a, b) => {
      if (a.ticketClass > b.ticketClass) {
        return 1;
      } else {
        return -1;
      }
    });
  } */

  const { departureStart, departureEnd, departure, destination } = queryObject;

  const startDate = new Date(departureStart);
  const endDate = new Date(departureEnd);

  return Ticket.aggregate([
    {
      $lookup: {
        from: "flightrecords",
        localField: "flightRecordId",
        foreignField: "_id",
        as: "record",
        pipeline: [
          {
            $lookup: {
              from: "flights",
              localField: "flightId",
              foreignField: "_id",
              as: "flight",
            },
          },
          {
            $unwind: "$flight",
          },
          {
            $match: {
              "flight.departure": departure,
              "flight.destination": destination,
            },
          },
          {
            $lookup: {
              from: "airplanes",
              localField: "airplaneId",
              foreignField: "_id",
              as: "airplane",
            },
          },
          {
            $unwind: "$airplane",
          },
          /* {
            $match: { "airplane.company": "test" },
          }, */
          {
            $unset: [
              "airplane.seats",
              "airplane.__v",
              "airplane.createdAt",
              "airplane.updatedAt",
              "flight.__v",
              "flight.createdAt",
              "flight.updatedAt",
              "__v",
              "createdAt",
              "updatedAt",
              "flightId",
              "airplaneId",
            ],
          },
        ],
      },
    },
    {
      $unwind: "$record",
    },
    {
      $match: {
        "record.flightDay": { $gte: startDate, $lte: endDate },
      },
    },
    {
      $unset: ["__v", "createdAt", "updatedAt", "flightRecordId"],
    },
  ]);
};

const findTicketByUser = async (userId) => {
  return Ticket.find({ userId }).populate({
    path: "flightRecordId",
    populate: {
      path: "flightId airplaneId",
    },
  });
};

const updateBookedTicket = async (
  userId,
  firstname,
  lastname,
  numberOfTickets,
  flightRecordId,
  ticketClass
) => {
  const bookedTickets = [];

  for (let i = 0; i < numberOfTickets; i++) {
    const bookedTicket = await Ticket.findOneAndUpdate(
      { flightRecordId, ticketClass, userId: null },
      {
        userId,
        "userData.firstname": firstname,
        "userData.lastname": lastname,
      },
      { new: true }
    );
    bookedTickets.push(bookedTicket);
  }

  /* return Ticket.findOneAndUpdate(
    { flightRecordId, ticketClass, userId: null },
    { userId, "userData.firstname": firstname, "userData.lastname": lastname },
    { new: true }
  ); */
  return bookedTickets;
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

  return Ticket.findByIdAndUpdate(
    ticketId,
    { userId: null, userData: null },
    { new: true }
  );
};

const findTicketsByRecord = async (recordId, queryObject) => {
  const page = queryObject?.page || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const count = await Ticket.countDocuments({ flightRecordId: recordId });

  const tickets = await Ticket.find({ flightRecordId: recordId })
    .populate({
      path: "flightRecordId",
      populate: {
        path: "flightId airplaneId",
      },
    })
    .skip(skip)
    .limit(limit);

  return { total: count, tickets };
};

module.exports = {
  createTicket,
  findTicketAndUpdate,
  findTicketAndDelete,
  findTickets,
  findTicketByUser,
  updateBookedTicket,
  updateReturnedTicket,
  findTicketsByRecord,
};
