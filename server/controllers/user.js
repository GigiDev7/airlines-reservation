const {
  findUser,
  createUser,
  comparePasswords,
  createToken,
  findAndDeleteUser,
  findUserAndUpdate,
} = require("../services/user");

const handleError = (error) => {
  let errors = {
    email: error?.errors?.email?.message || "",
    password: error?.errors?.password?.message || "",
    firstname: error?.errors?.firstname?.message || "",
    lastname: error?.errors?.lastname?.message || "",
    dateOfBirth: error?.errors?.dateOfBirth?.message || "",
  };
  if (error.code === 11000) {
    errors.email = "Email already exists";
  }

  return errors;
};

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

const register = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json(errors);
  }
};

const deleteUser = async (req, res) => {
  try {
    const message = await findAndDeleteUser(req.user._id);
    res.status(204).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await findUserAndUpdate(req.user._id, req.body);
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
