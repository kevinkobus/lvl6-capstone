const express = require("express");
const authRouter = express.Router();
const Golfer = require("../models/Golfer");
const jwt = require("jsonwebtoken");

// Signup
authRouter.post("/signup", (req, res, next) => {
  // check if the username already exists, return error msg if it does
  Golfer.findOne({ username: req.body.username.toLowerCase() }).then((user) => {
    if (user) {
      res.status(403);
      return next(new Error("This username already exists"));
    }
    // saving the new golfer
    const newGolfer = new Golfer(req.body);
    // saving to the db
    newGolfer
      .save()
      .then((savedGolfer) => {
        // return the token and golfer (payload, secret from .env)
        const token = jwt.sign(savedGolfer.withoutPassword(), process.env.SECRET);
        return res
          .status(200)
          .send({ token, golfer: savedGolfer.withoutPassword() });
      })
      .catch((err) => {
        res.status(500);
        return next(err);
      });
  });
});

// Login
authRouter.post("/login", (req, res, next) => {
  // check if login info exists and/or is accurate
  golfer.findOne({ username: req.body.username.toLowerCase() })
    .then((golfer) => {
      // if doesn't exist and/or is not accurate throw this error msg
      if (!golfer) {
        res.status(403);
        return next(new Error("Username and/or password are incorrect"));
      }
      // manual way to check if password is correct
      // if (req.body.password !== golfer.password) {
      //   res.status(403)
      //   return next(new Error("Username or Password are incorrect"))
      // }
      // bcrypt way of checking if password is correct
      golfer.checkPassword(req.body.password, (err, isMatch) => {
        if (err) {
          res.status(403);
          return next(new Error("Username and/or Password are incorrect"));
        }
        if (!isMatch) {
          res.status(403);
          return next(new Error("Username and/or Password are incorrect"));
        }
        //   otherwise return the token and user (payload, secret from .env)
        const token = jwt.sign(golfer.withoutPassword(), process.env.SECRET);
        return res.status(200).send({ token, golfer: golfer.withoutPassword() });
      });
    })

    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

module.exports = authRouter;
