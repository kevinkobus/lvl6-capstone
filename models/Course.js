const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Course model/blueprint
const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  state: {
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
  score: {
    type: Number,
    minlength: 2,
    maxlength: 3,
  },
  website: {
    type: String,
  },
  likes: [
    {
      golfer: {
        type: Schema.Types.ObjectId,
        ref: "Golfer",
      },
      golfername: {
        type: String,
      },
    },
  ],
  dislikes: [
    {
      golfer: {
        type: Schema.Types.ObjectId,
        ref: "Golfer",
      },
      golfername: {
        type: String,
      },
    },
  ],
  golfer: {
    type: Schema.Types.ObjectId,
    ref: "Golfer",
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);