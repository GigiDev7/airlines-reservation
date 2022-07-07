const FlightRecord = require("../models/flightRecordsSchema");
const Airplane = require("../models/airplaneSchema");
const Flight = require("../models/flightSchema");
const Ticket = require("../models/ticketSchema");

function generateTickets(tickets, id) {
  const generatedTickets = [];

  for (let ticket of tickets) {
    for (let i = 0; i < ticket.count; i++) {
      const newTicket = {
        price: ticket.price,
        ticketClass: ticket.ticketClass,
        flightRecordId: id,
      };
      generatedTickets.push(newTicket);
    }
  }

  return generatedTickets;
}

const createFlightRecord = async (flightData) => {
  const airplane = await Airplane.findOne({ company: flightData.airline });
  const { flightId, tickets } = flightData;
  const result = [];

  for (let flightDay of flightData.flightDays) {
    const newFlight = await FlightRecord.create({
      airplaneId: airplane._id,
      flightDay,
      flightId,
    });

    const generatedTickets = generateTickets(tickets, newFlight._id);

    await Ticket.insertMany(generatedTickets);

    result.push(newFlight);
  }

  return result;
};

const findFlightRecords = async (queryObject) => {
  const {
    destination,
    departure,
    departureStart,
    departureEnd,
    airline,
    sort,
  } = queryObject;

  const page = queryObject?.page || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  if (!destination || !departure || !departureStart || !departureEnd) {
    const count = await FlightRecord.countDocuments();
    const records = await FlightRecord.find()
      .populate("flightId airplaneId")
      .skip(skip)
      .limit(limit);

    return { count, records };
  }

  const flight = await Flight.findOne({ departure, destination });
  if (!flight) return { count: 0, records: [] };

  if (airline?.in) {
    const companies = airline.in.split(",");

    const airplanes = await Airplane.find({ company: { $in: companies } });
    if (!airplanes || !airplanes.length) return { total: 0, records: [] };
    const airplaneIds = airplanes.map((airplane) => airplane._id);

    const count = await FlightRecord.countDocuments({
      flightDay: { $gte: departureStart, $lte: departureEnd },
      flightId: flight._id,
      airplaneId: { $in: airplaneIds },
    });
    const records = await FlightRecord.find({
      flightDay: { $gte: departureStart, $lte: departureEnd },
      flightId: flight._id,
      airplaneId: { $in: airplaneIds },
    })
      .populate({ path: "airplaneId" })
      .populate({
        path: "flightId",
      })
      .sort("flightDay");
    return { count, records };
  }

  const count = await FlightRecord.countDocuments({
    flightDay: { $gte: departureStart, $lte: departureEnd },
    flightId: flight._id,
  });
  const records = await FlightRecord.find({
    flightDay: { $gte: departureStart, $lte: departureEnd },
    flightId: flight._id,
  })
    .populate({ path: "airplaneId" })
    .populate({
      path: "flightId",
    })
    .sort("flightDay");

  return { count, records };
};

const findFlightRecordAndUpdate = async (recordId, flightData) => {
  const airplane = await Airplane.findOne({ company: flightData.airline });

  return FlightRecord.findByIdAndUpdate(
    recordId,
    {
      airplaneId: airplane._id,
      flightDay: flightData.flightDay,
      businessTickets: flightData.businessTickets,
      standartTickets: flightData.standartTickets,
      economTickets: flightData.economTickets,
    },
    { new: true }
  );
};

const findFlightRecordAndDelete = async (recordId) => {
  //await Ticket.deleteMany({ flightRecordId: recordId });
  return FlightRecord.findByIdAndDelete(recordId);
};

module.exports = {
  createFlightRecord,
  findFlightRecords,
  findFlightRecordAndDelete,
  findFlightRecordAndUpdate,
  generateTickets,
};
