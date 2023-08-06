const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  // courses: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Course",
  //   },
  // ],
});

module.exports = mongoose.model("User", userSchema);

// ideas - bio, player since, home course, favorite course
