const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
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
  yesVote: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  noVote: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", courseSchema);
