const Airplane = require("../../models/airplaneSchema");
const airplaneService = require("../../services/airplane");

jest.mock("../../models/airplaneSchema");

describe("airplanes service", () => {
  describe("create airplane", () => {
    it("should add new airplane in db and return it", async () => {
      const airplaneData = {
        numberOfSeats: 2,
        company: "mockCompany",
      };

      Airplane.create.mockResolvedValue({
        company: "mockCompany",
        seats: [{ available: true }, { available: true }],
      });

      const airplane = await Airplane.create(airplaneData);

      expect(airplane).toMatchObject({
        company: "mockCompany",
        seats: [{ available: true }, { available: true }],
      });
    });
  });
});
