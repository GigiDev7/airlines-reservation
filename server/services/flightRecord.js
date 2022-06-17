const FlightRecord = require("../models/flightRecordsSchema");
const Airplane = require("../models/airplaneSchema");
const Flight = require("../models/flightSchema");

const createFlightRecord = async (flightData) => {
  const airplane = await Airplane.findOne({ company: flightData.airline });

  return FlightRecord.create({
    airplaneId: airplane._id,
    flightDay: flightData.departureTime,
    flightId: flightData.flightId,
  });
};

const findFlightRecords = async (queryObject) => {
  const { destination, departure, departureStart, departureEnd, sort } =
    queryObject;

  if (!destination || !departure || !departureStart || !departureEnd) {
    return FlightRecord.find().populate("flightId airplaneId");
  }

  const flight = await Flight.findOne({ departure, destination });
  if (!flight) return [];

  return FlightRecord.find({
    departureTime: { $gte: departureStart, $lte: departureEnd },
    flightId: flight._id,
  })
    .populate({ path: "airplaneId" })
    .populate({
      path: "flightId",
      /*  match: {
        departure,
        destination,
      }, */
    });
};

const findFlightRecordAndUpdate = async (recordId, flightData) => {
  return FlightRecord.findByIdAndUpdate(recordId, flightData, { new: true });
};

const findFlightRecordAndDelete = async (recordId) => {
  return FlightRecord.findByIdAndDelete(recordId);
};

module.exports = {
  createFlightRecord,
  findFlightRecords,
  findFlightRecordAndDelete,
  findFlightRecordAndUpdate,
};
