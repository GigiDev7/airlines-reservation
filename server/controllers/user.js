const {
  findUser,
  createUser,
  findAndDeleteUser,
  findUserAndUpdate,
} = require("../services/user");

const { validationResult } = require("express-validator");

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const result = await findUser(req.body.email, req.body.password);
    if (result.errorMessage) {
      return res.status(401).json({ message: result.errorMessage });
    }
    const { email, firstname, lastname, role } = result.userData;
    return res
      .status(200)
      .json({ email, firstname, lastname, role, token: result.token });
  } catch (err) {
    res.status(500).json(err);
  }
};

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newUser = await createUser(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deletedUser = await findAndDeleteUser(userId);
    res.status(200).json(deletedUser);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updatedUser = await findUserAndUpdate(userId, req.body);
    res.status(201).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
  deleteUser,
  updateUser,
};
