const User = require("../models/userSchema");

const adminGuard = (req, res, next) => {
  const user = User.findById(req.userId);
  if (user.role !== "admin") {
    return res.status(403).json({ message: "You are not allowed to proceed" });
  }
  next();
};

module.exports = { adminGuard };
