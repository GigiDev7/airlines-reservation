const userController = require("../../controllers/user");
const userServices = require("../../services/user");

jest.mock("../../services/user");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((x) => x),
};

const req = {
  body: {
    email: "email",
    password: "password",
  },
};

describe("user controller", () => {
  describe("Login User: invalid", () => {
    it("should return error message", async () => {
      userServices.findUser.mockResolvedValue({
        errorMessage: "Wrong user email or password",
      });

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Wrong user email or password",
      });
    });
  });

  describe("Login User successfull", () => {
    it("should login user and return user data", async () => {
      userServices.findUser.mockResolvedValue({
        userData: {
          email: "email",
          firstname: "firstname",
          lastname: "lastname",
          role: "role",
        },
      });

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        email: "email",
        firstname: "firstname",
        lastname: "lastname",
        role: "role",
      });
    });
  });
});
