const FlightRecord = require("../models/flightRecordsSchema");
const Airplane = require("../models/airplaneSchema");
const Flight = require("../models/flightSchema");

const createFlightRecord = async (flightData) => {
  const airplane = await Airplane.findOne({ company: flightData.airline });
  const result = [];

  for (let flightDay of flightData.flightDays) {
    const newFlight = await Flight.create({
      airplaneId: airplane._id,
      flightDay,
      flightId: flightData.flightId,
    });
    result.push(newFlight);
  }

  return result;
};

const findFlightRecords = async (queryObject) => {
  const { destination, departure, departureStart, departureEnd, sort } =
    queryObject;

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
  if (!flight) return { total: 0, records: [] };

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
      /*  match: {
        departure,
        destination,
      }, */
    });
  return { count, records };
};

const findFlightRecordAndUpdate = async (recordId, flightData) => {
  const airplane = await Airplane.findOne({ company: flightData.airline });

  return FlightRecord.findByIdAndUpdate(
    recordId,
    {
      airplaneId: airplane._id,
      flightDay: flightData.flightDay,
    },
    { new: true }
  );
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
