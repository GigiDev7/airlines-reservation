const FlightRecord = require("../models/flightRecordsSchema");
const Airplane = require("../models/airplaneSchema");

const createFlightRecord = async (flightData) => {
  const airplane = await Airplane.findOne({ company: flightData.airline });

  return FlightRecord.create({
    airplaneId: airplane._id,
    flightDay: flightData.departureTime,
    flightId: flightData.flightId,
  });
};

const findFlightRecords = async (queryObject) => {
  const filterObject = {};
  const { destination, departure, departureStart, departureEnd, sort } =
    queryObject;
  if (destination) filterObject.destination = destination;
  if (departure) filterObject.departure = departure;
  if (departureStart && departureEnd)
    filterObject.departureTime = { $gte: departureStart, $lte: departureEnd };

  if (sort) filterObject.sort = sort;

  return FlightRecord.find({ departureTime: filterObject.departureTime })
    .populate({ path: "airplaneId" })
    .populate({
      path: "flightId",
      match: {
        departure: filterObject.departure,
        destination: filterObject.destination,
      },
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
