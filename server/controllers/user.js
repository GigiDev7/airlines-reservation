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
    const user = await findUser(req.body.email);
    if (!user) {
      return res.status(401).json({ message: "Wrong user email or password" });
    }
    const isPasswordCorrect = await comparePasswords(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Wrong user email or password" });
    }
    const token = createToken(user._id);
    const { firstname, lastname, role, residence } = user;
    res.status(200).json({
      token,
      firstname,
      lastname,
      role,
      residence,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const register = async (req, res) => {
  try {
    await createUser(req.body);
    res.status(200).json({ message: "Successfully registered" });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json(errors);
  }
};

const deleteUser = async (req, res) => {
  try {
    await findAndDeleteUser(req.userId);
    res.status(204);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    await findAndDeleteUser(req.userId, req.body);
    res.status(201).json({ message: "User updated" });
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
