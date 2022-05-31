exports.errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    res.status(400).json({ message: "Email already exists" });
  } else if (err.name === "ValidationError") {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json(err);
  }
};
