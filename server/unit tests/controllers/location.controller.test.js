const { getLocations } = require("../../controllers/location");
const { findLocations } = require("../../services/location");

jest.mock("../../services/location");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((x) => x),
};

describe("location controller", () => {
  describe("get locations", () => {
    it("should find locations and return array of locations", async () => {
      findLocations.mockResolvedValue([{ city: "city", country: "country" }]);

      await getLocations("", res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { city: "city", country: "country" },
      ]);
    });
  });
});
