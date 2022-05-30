const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);

module.exports = app;
