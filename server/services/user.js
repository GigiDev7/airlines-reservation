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

const findUser = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const createUser = async (userData) => {
  await User.create(userData);
};

module.exports = {
  findUser,
  createUser,
  createToken,
  comparePasswords,
};
