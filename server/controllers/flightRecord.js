const {
  createFlightRecord,
  findFlightRecordAndDelete,
  findFlightRecordAndUpdate,
  findFlightRecords,
} = require("../services/flightRecord");

const addFlightRecord = async (req, res, next) => {
  try {
    const newRecords = await createFlightRecord(req.body);
    res.status(200).json(newRecords);
  } catch (error) {
    next(error);
  }
};

const getFlightRecords = async (req, res, next) => {
  try {
    const { count, records } = await findFlightRecords(req.query);
    res.status(200).json({ total: count, records });
  } catch (error) {
    next(error);
  }
};

const updateFlightRecord = async (req, res, next) => {
  try {
    const { recordId } = req.params;
    const updatedRecord = await findFlightRecordAndUpdate(recordId, req.body);
    res.status(201).json(updatedRecord);
  } catch (error) {
    next(error);
  }
};

const deleteFlightRecord = async (req, res, next) => {
  try {
    const { recordId } = req.params;
    const deletedRecord = await findFlightRecordAndDelete(recordId);
    res.status(200).json(deletedRecord);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFlightRecords,
  addFlightRecord,
  updateFlightRecord,
  deleteFlightRecord,
};
