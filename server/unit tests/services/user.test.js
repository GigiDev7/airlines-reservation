const User = require("../../models/userSchema");
const userService = require("../../services/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");
jest.mock("bcrypt");
jest.mock("../../models/userSchema");

describe("user service", () => {
  describe("LOGIN:user not found", () => {
    it("should not compare password, return error", async () => {
      User.findOne.mockImplementationOnce(() => null);
      const result = await userService.findUser("email", "password");

      expect(result.errorMessage).toBe("Wrong user email or password");
      expect(result.userData).toBe(null);
      expect(result.token).toBe(null);
    });
  });

  describe("LOGIN:user found, passwords not correct", () => {
    it("should return error", async () => {
      User.findOne.mockResolvedValue({
        email: "email",
        password: "password",
      });

      bcrypt.compare.mockReturnValueOnce(false);
      const result = await userService.findUser("email", "password");

      expect(result.errorMessage).toBe("Wrong user email or password");
      expect(result.userData).toBe(null);
      expect(result.token).toBe(null);
    });
  });

  describe("LOGIN: successfull login", () => {
    it("should create token, login user", async () => {
      User.findOne.mockImplementationOnce(() => ({
        email: "email",
        password: "password",
      }));
      bcrypt.compare.mockReturnValueOnce(true);
      jwt.sign.mockReturnValueOnce("mockToken");
      const result = await userService.findUser("email", "password");

      expect(result.errorMessage).toBe("");
      expect(result.token).toBe("mockToken");
      expect(result.userData).toEqual({
        email: "email",
        password: "password",
      });
    });
  });
});
