const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Course model/blueprint
const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  region: {
    type: String,
  },
  par: {
    type: Number,
    required: true,
  },
  played: {
    type: Boolean,
    default: false,
  },
  score: {
    type: Number,
    minlength: 2,
    maxlength: 3,
  },
  website: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);