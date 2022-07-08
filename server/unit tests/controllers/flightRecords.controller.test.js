const flightRecordServices = require("../../services/flightRecord");
const flightRecordController = require("../../controllers/flightRecord");

jest.mock("../../services/flightRecord");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((x) => x),
};

const req = {
  body: {},
};

describe("flight records controller", () => {
  describe("get flight records", () => {
    it("should find records and return them", async () => {
      flightRecordServices.findFlightRecords.mockResolvedValue({
        records: [{ record: "record" }],
        count: "total",
      });

      await flightRecordController.getFlightRecords(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        records: [{ record: "record" }],
        total: "total",
      });
    });
  });
});
