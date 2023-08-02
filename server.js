const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect("mongodb://localhost:27017/golfcoursedb")
  .then(() => console.log("Connected to the Golf Course DB"));

app.use("/api/golfer", require("./routes/golferRouter.js"));
app.use("/api/course", require("./routes/courseRouter.js"))

app.use((err, req, res, next) => {
  console.log(err);
  return res.send({ errMsg: err.message });
});

app.listen(8000, () => {
  console.log("The server is running on Port 8000");
});