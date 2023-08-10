const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
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
  // courses: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Course",
  //   },
  // ],
});

// pre-save hook to encrypt user passwords on signup
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// method to check encrypted password on login
userSchema.methods.checkPassword = function (passwordAttempt, callback) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if (err) callback(err);
    return callback(null, isMatch);
  });
};

// method to remove user's password for token/sending the response
userSchema.methods.withoutPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);

// ideas - bio, player since, home course, favorite course
