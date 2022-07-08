const flightsController = require("../../controllers/flights");
const flightServices = require("../../services/flights");

jest.mock("../../services/flights");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((x) => x),
};

const req = {
  body: {},
  query: {
    destination: "destination",
    departure: "departure",
    sort: "sort",
  },
};

describe("flight controller", () => {
  describe("get flights", () => {
    it("should find flights and return them", async () => {
      flightServices.findFlights.mockResolvedValue([{ flight: "flight" }]);

      await flightsController.getFlights(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([{ flight: "flight" }])
      );
    });
  });
});
