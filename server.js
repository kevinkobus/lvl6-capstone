const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const { expressjwt } = require("express-jwt");

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Connect to DB w/Mongoose
mongoose
  .connect("mongodb://localhost:27017/golftrackerdb")
  .then(() => console.log("Connected to the Golf Tracker DB"));

// Authorization route
app.use("/auth", require("./routes/authRouter.js"));

// Express-jwt/dotenv for user authentication w/token
app.use(
  "/api/gatekeeper",
  expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
);

app.use("/api/gatekeeper/course", require("./routes/courseRouter.js"));

// Error handling
app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnathorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

app.listen(8000, () => {
  console.log("The server is running on Port 8000");
});
