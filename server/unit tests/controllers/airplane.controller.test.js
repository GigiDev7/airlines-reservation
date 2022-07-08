const airplaneController = require("../../controllers/airplane");
const airplaneServices = require("../../services/airplane");

jest.mock("../../services/airplane");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((x) => x),
};

const req = {
  body: {},
  params: { airplaneId: "id" },
  query: { company: "company" },
};

describe("airplane controller", () => {
  describe("adding airplane", () => {
    it("should create new airplane in DB and return it", async () => {
      airplaneServices.createAirplane.mockResolvedValue({
        airplane: "airplane",
        company: "company",
      });

      await airplaneController.addAirplane(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        airplane: "airplane",
        company: "company",
      });
    });
  });

  describe("update airplane", () => {
    it("should update existing airplane and return it", async () => {
      airplaneServices.findAirplaneAndUpdate.mockResolvedValue({
        airplane: "updated airplane",
        company: "company",
      });

      await airplaneController.updateAirplane(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        airplane: "updated airplane",
        company: "company",
      });
    });
  });

  describe("delete airplane", () => {
    it("should delete existing airplane from db", async () => {
      airplaneServices.findAirplaneAndUpdate.mockResolvedValue({
        airplane: "updated airplane",
        company: "company",
      });

      await airplaneController.deleteAirplane(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
    });
  });

  describe("get airplanes", () => {
    it("should find airplanes in DB and return it", async () => {
      airplaneServices.findAirplanes.mockResolvedValue([
        {
          company: "company",
          airplane: "airplane",
        },
      ]);

      await airplaneController.getAirplanes(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([
          {
            company: "company",
            airplane: "airplane",
          },
        ])
      );
    });
  });
});
