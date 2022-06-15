const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { errorHandler } = require("./middlewares/errorHandler");

const userRouter = require("./routes/user");
const ticketsRouter = require("./routes/ticket");
const flightsRouter = require("./routes/flights");
const airplaneRouter = require("./routes/airplane");
const locationRouter = require("./routes/location");
const flightRecordRouter = require("./routes/flightRecord");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/tickets", ticketsRouter);
app.use("/flights", flightsRouter);
app.use("/airplane", airplaneRouter);
app.use("/locations", locationRouter);
app.use("/flight-record", flightRecordRouter);

app.use(errorHandler);

module.exports = app;
