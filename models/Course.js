const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
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
});

module.exports = mongoose.model("Issue", issueSchema);