const Ticket = require("../models/ticketSchema");
const mongoose = require("mongoose");

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

  const { departureStart, departureEnd, departure, destination, sort } =
    queryObject;

  //filtering
  const filterObject = {
    airplaneFilter: {},
    ticketClassFilter: {},
    priceFilter: {},
  };

  if (queryObject?.airplane?.in) {
    filterObject.airplaneFilter = {
      "airplane.company": { $in: queryObject.airplane.in.split(",") },
    };
  }

  if (queryObject?.ticketClass) {
    filterObject.ticketClassFilter = { ticketClass: queryObject.ticketClass };
  }

  if (queryObject?.price?.gte && queryObject?.price?.lte) {
    filterObject.priceFilter = {
      price: { $gte: +queryObject.price.gte, $lte: +queryObject.price.lte },
    };
  }

  //query
  const startDate = new Date(departureStart);
  const endDate = new Date(departureEnd);

  const tickets = await Ticket.aggregate([
    {
      $match: { userId: null },
    },
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
          {
            $match: filterObject.airplaneFilter,
          },
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
      $match: filterObject.ticketClassFilter,
    },
    {
      $match: filterObject.priceFilter,
    },
    {
      $unset: ["__v", "createdAt", "updatedAt", "flightRecordId"],
    },
    {
      $group: {
        _id: "$record._id",
        tickets: {
          $push: "$$ROOT",
        },
      },
    },

    {
      $addFields: {
        businessTickets: {
          $filter: {
            input: "$tickets",
            as: "item",
            cond: { $eq: ["$$item.ticketClass", "business"] },
          },
        },
        standartTickets: {
          $filter: {
            input: "$tickets",
            as: "item",
            cond: { $eq: ["$$item.ticketClass", "standart"] },
          },
        },
        economTickets: {
          $filter: {
            input: "$tickets",
            as: "item",
            cond: { $eq: ["$$item.ticketClass", "econom"] },
          },
        },
      },
    },
    {
      $addFields: {
        businessTicket: {
          $arrayElemAt: ["$businessTickets", 0],
        },
        standartTicket: {
          $arrayElemAt: ["$standartTickets", 0],
        },
        economTicket: {
          $arrayElemAt: ["$economTickets", 0],
        },
        availableBusiness: { $size: "$businessTickets" },
        availableStandart: { $size: "$standartTickets" },
        availableEconom: { $size: "$economTickets" },
      },
    },
    {
      $unset: [
        "tickets",
        "businessTickets",
        "standartTickets",
        "economTickets",
      ],
    },
  ]);

  //result
  let result = [];
  const availableTickets = queryObject.availableTickets || 1;

  for (let ticket of tickets) {
    if (
      ticket.businessTicket &&
      ticket?.availableBusiness >= availableTickets
    ) {
      result.push({
        ...ticket.businessTicket,
        available: ticket?.availableBusiness,
      });
    }
    if (
      ticket.standartTicket &&
      ticket?.availableStandart >= availableTickets
    ) {
      result.push({
        ...ticket.standartTicket,
        available: ticket?.availableStandart,
      });
    }
    if (ticket.economTicket && ticket?.availableEconom >= availableTickets) {
      result.push({
        ...ticket.economTicket,
        available: ticket?.availableEconom,
      });
    }
  }

  //pagination
  const page = queryObject.page || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  result = result.slice(skip, skip + limit);

  //sorting
  if (!sort || sort === "flightDay") {
    return result.sort((a, b) => a.record.flightDay - b.record.flightDay);
  }
  if (sort === "price") {
    return result.sort((a, b) => a.price - b.price);
  }
  if (sort === "-price") {
    return result.sort((a, b) => b.price - a.price);
  }
  if (sort === "ticketClass") {
    return result.sort((a, b) => {
      if (a.ticketClass > b.ticketClass) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  return result;
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
  userData,
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
        userData: userData[i],
        /* "userData.firstname": firstname,
        "userData.lastname": lastname, */
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
  const ticket = await Ticket.findById(ticketId).populate({
    path: "flightRecordId",
    populate: {
      path: "flightId",
    },
  });
  /*  const lastDayToReturn = new Date(
    new Date(ticket.flightRecordId.flightDay) -
      1000 * 60 * 60 * process.env.RETURN_EXPIRATION
  ); */

  const flightDate = ticket.flightRecordId.flightDay.toDateString();
  const lastDayToReturn =
    new Date(`${flightDate} ${ticket.flightRecordId.flightId.departureTime}`) -
    1000 * 60 * 60 * process.env.RETURN_EXPIRATION;

  if (new Date(lastDayToReturn) < new Date()) {
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
