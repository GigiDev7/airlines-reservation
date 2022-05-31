const {
  findUser,
  createUser,
  findAndDeleteUser,
  findUserAndUpdate,
} = require("../services/user");

const login = async (req, res) => {
  try {
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
    const newUser = await createUser(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const message = await findAndDeleteUser(userId);
    res.status(204).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await findUserAndUpdate(userId, req.body);
    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  login,
  register,
  deleteUser,
  updateUser,
};
