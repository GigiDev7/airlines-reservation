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

const findFlightRecords = async () => {
  return FlightRecord.find();
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
