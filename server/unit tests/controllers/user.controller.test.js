const userController = require("../../controllers/user");
const userServices = require("../../services/user");
const { errorHandler } = require("../../middlewares/errorHandler");

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
  params: {
    userId: "user",
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

  describe("Register user: successfull", () => {
    it("should register user and return user data", async () => {
      userServices.createUser.mockResolvedValue({
        email: "email",
        firstname: "firstname",
        lastname: "lastname",
        role: "role",
      });

      await userController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        email: "email",
        firstname: "firstname",
        lastname: "lastname",
        role: "role",
      });
    });
  });

  describe("Register user: invalid", () => {
    it("should return error message", async () => {
      class ValidationError {
        constructor() {
          this.name = "ValidationError";
          this.message = "Validation Error";
        }
      }

      const next = jest.fn((e) => errorHandler(e, req, res));

      userServices.createUser.mockImplementation(() => {
        throw new ValidationError();
      });

      try {
        userController.register(req, res, next);
      } catch (error) {
        next(error);
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Validation Error" });
    });

    describe("Register user: already exists", () => {
      it("should return error", async () => {
        class MockError {
          constructor() {
            this.code = 11000;
          }
        }
        const next = jest.fn((e) => errorHandler(e, req, res));

        userServices.createUser.mockImplementation(() => {
          throw new MockError();
        });

        try {
          userController.register(req, res, next);
        } catch (error) {
          next(error);
        }

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          message: "Email already exists",
        });
      });
    });
  });

  describe("delete user", () => {
    it("should delete user from db and return deleted user", async () => {
      userServices.findAndDeleteUser.mockResolvedValue({
        email: "email",
        id: "id",
        password: "password",
      });

      const next = jest.fn((e) => errorHandler(e, req, res));

      await userController.deleteUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        email: "email",
        id: "id",
        password: "password",
      });
    });
  });

  describe("update user", () => {
    it("should update user data and return it", async () => {
      userServices.findUserAndUpdate.mockResolvedValue({ user: "user" });

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ user: "user" });
    });
  });
});
