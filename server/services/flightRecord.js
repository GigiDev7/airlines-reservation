const FlightRecord = require("../models/flightRecordsSchema");
const Airplane = require("../models/airplaneSchema");
const Flight = require("../models/flightSchema");

const createFlightRecord = async (flightData) => {
  const airplane = await Airplane.findOne({ company: flightData.airline });

  return FlightRecord.create({
    airplaneId: airplane._id,
    departureTime: flightData.departureTime,
    arrivalTime: flightData.arrivalTime,
    flightId: flightData.flightId,
  });
};

const findFlightRecords = async (queryObject) => {
  const { destination, departure, departureStart, departureEnd, sort } =
    queryObject;

  const page = queryObject?.page || 1;
  const skip = (page - 1) * 5;

  if (!destination || !departure || !departureStart || !departureEnd) {
    const count = await FlightRecord.countDocuments();
    const records = await FlightRecord.find()
      .populate("flightId airplaneId")
      .skip(skip)
      .limit(5);

    return { count, records };
  }

  const flight = await Flight.findOne({ departure, destination });
  if (!flight) return { total: 0, records: [] };

  const count = await FlightRecord.countDocuments({
    departureTime: { $gte: departureStart, $lte: departureEnd },
    flightId: flight._id,
  });
  const records = await FlightRecord.find({
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
  return { count, records };
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
