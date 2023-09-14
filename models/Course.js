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
  yesVotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      username: {
        type: String,
        required: true,
      },
    },
  ],
  noVotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      username: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", courseSchema);
