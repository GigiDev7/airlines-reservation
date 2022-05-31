const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { errorHandler } = require("./middlewares/errorHandler");

const userRouter = require("./routes/user");
const ticketsRouter = require("./routes/ticket");
const flightsRouter = require("./routes/flights");
const airplaneRouter = require("./routes/airplane");
const countryRouter = require("./routes/country");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/tickets", ticketsRouter);
app.use("/flights", flightsRouter);
app.use("/airplane", airplaneRouter);
app.use("/countries", countryRouter);

app.use(errorHandler);

module.exports = app;
