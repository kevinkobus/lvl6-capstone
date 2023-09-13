const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/Comment.js");
const User = require("../models/User.js")
const Course = require("../models/Course.js")

// Add new comment
commentRouter.post("/:courseId", (req, res, next) => {
  const enteredComment = {
    comment: req.body.comment,
    user: req.params.courseId,
    course: req.params.courseId
  }
    const newComment = new Comment(enteredComment)
  newComment
    .save()
    .then((savedComment) => {
      return res.status(201).send(savedComment);
    })
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// // Get all comments for a specific issue
commentRouter.get("/:courseId", (req, res, next) => {
  Comment.find({ issue: req.params.courseId })
    .then((comments) => {
      return res.status(200).send(comments);
    })
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// Delete a comment
commentRouter.delete("./commentId", (req, res, next) => {
  Comment.findOneAndDelete({ _id: req.params.commentId, user: req.auth._id })
  .then((deletedComment) => {
    // if statement to help with test route with Postman
    if (!deletedComment) {
      return res.status(404).send("Comment not found");
    }
    return res
      .status(200)
      .send(
        `Successfully deleted Comment: ${deletedComment} from the database`
      );
  })
  .catch((err) => {
    res.status(500);
    return next(err);
  });
});

// Update/Edit a comment
commentRouter.put("/:commentId", (req, res, next) => {
  Comment.findOneAndUpdate(
    { _id: req.params.commentId, user: req.auth._id },
    req.body,
    { new: true }
  )
    .then((updatedComment) => {
      // if statement to help with test route with Postman
      if (!updatedComment) {
        return res.status(404).send("Comment not found");
      }
      return res.status(200).send(updatedComment);
    })
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

module.exports = commentRouter;