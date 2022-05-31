const adminGuard = async (req, res, next) => {
  if (req?.user?.role !== "admin") {
    return res.status(403).json({ message: "You are not allowed to proceed" });
  }
  next();
};

module.exports = { adminGuard };
