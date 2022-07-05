const { findUser } = require("../services/user");
const User = require("../models/userSchema");

jest.mock("../models/userSchema");
const comparePasswords = jest.fn();

describe("user services", () => {
  describe("user not found", () => {
    it("should not compare password, return error", async () => {
      User.findOne.mockImplementationOnce(() => null);
      const result = await findUser("mock_email", "mock_password");

      expect(comparePasswords).not.toHaveBeenCalled();
      expect(result.errorMessage).toBe("Wrong user email or password");
    });
  });
});
