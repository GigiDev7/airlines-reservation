const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const createToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  return token;
};

const comparePasswords = async (password, hashedPassword) => {
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  return isPasswordCorrect;
};

const findUser = async (email, password) => {
  let result = { errorMessage: "", userData: null, token: null };
  const user = await User.findOne({ email });
  if (!user) {
    result.errorMessage = "Wrong user email or password";
    return result;
  }
  const isPasswordCorrect = await comparePasswords(password, user?.password);
  if (!isPasswordCorrect) {
    result.errorMessage = "Wrong user email or password";
    return result;
  }
  const token = createToken(user._id);
  result.userData = user;
  result.token = token;
  return result;
};

const createUser = async (userData) => {
  return User.create(userData);
};

const findAndDeleteUser = async (userId) => {
  return User.findByIdAndDelete(userId);
};

const findUserAndUpdate = async (userId, userData) => {
  return User.findByIdAndUpdate(userId, userData, { new: true });
};

module.exports = {
  findUser,
  createUser,
  createToken,
  comparePasswords,
  findAndDeleteUser,
  findUserAndUpdate,
};
