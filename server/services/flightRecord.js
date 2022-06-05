const FlightRecord = require("../models/flightRecordsSchema");

const createFlightRecord = async (flightData) => {
  return FlightRecord.create(flightData);
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
