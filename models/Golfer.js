const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const golferSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 16,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  handicap: {
    type: Number,
    min: 0,
    max: 36,
  },
  memberSince: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// pre-save hook to encrypt user passwords on signup
golferSchema.pre("save", function (next) {
  const golfer = this;
  if (!golfer.isModified("password")) return next();
  bcrypt.hash(golfer.password, 10, (err, hash) => {
    if (err) return next(err);
    golfer.password = hash;
    next();
  });
});

// method to check encrypted password on login
golferSchema.methods.checkPassword = function (passwordAttempt, callback) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if (err) callback(err);
    return callback(null, isMatch);
  });
};

// method to remove golfer's password for token/sending the response
golferSchema.methods.withoutPassword = function () {
  const golfer = this.toObject();
  delete golfer.password;
  return golfer;
};

module.exports = mongoose.model("Golfer", golferSchema);

// ideas - bio, age started golfing, home course, favorite course, nickname
