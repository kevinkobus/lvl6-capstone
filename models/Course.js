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
  par: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("Course", courseSchema);