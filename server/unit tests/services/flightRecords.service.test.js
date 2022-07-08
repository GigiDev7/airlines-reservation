const flightRecordService = require("../../services/flightRecord");
const Airplane = require("../../models/airplaneSchema");
const FlightRecord = require("../../models/flightRecordsSchema");

jest.mock("../../models/airplaneSchema");
jest.mock("../../models/flightRecordsSchema");

describe("flight records service", () => {
  describe("generate tickets", () => {
    it("should create certain amount of new tickets", () => {
      const tickets = [
        {
          count: 1,
          price: 100,
          ticketClass: "mockClass",
        },
      ];

      const result = flightRecordService.generateTickets(tickets, "id");

      expect(result).toEqual(
        expect.arrayContaining([
          {
            price: 100,
            ticketClass: "mockClass",
            flightRecordId: "id",
          },
        ])
      );
    });
  });

  describe("update flight record", () => {
    it("find existing record in db and update it", async () => {
      const flightData = {
        flightDay: new Date(),
        businessTickets: 1,
        standartTickets: 1,
        economTickets: 1,
      };

      Airplane.findOne.mockResolvedValue({
        _id: "airplaneId",
      });

      const airplane = await Airplane.findOne();

      FlightRecord.findByIdAndUpdate.mockResolvedValue({
        airplaneId: airplane._id,
        flightDay: flightData.flightDay,
        businessTickets: flightData.businessTickets,
        standartTickets: flightData.standartTickets,
        economTickets: flightData.economTickets,
      });

      const result = await FlightRecord.findByIdAndUpdate();

      expect(result).toMatchObject(flightData);
    });
  });
});
