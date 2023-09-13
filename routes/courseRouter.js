const express = require("express");
const courseRouter = express.Router();
const Course = require("../models/Course.js");


// Get courses by user id
courseRouter.get("/user", (req, res, next) => {
  Course.find({ user: req.auth._id })
    .then((foundCourses) => {
      if (!foundCourses) {
        return res.status(404).send("No courses saved yet");
      }
      return res.status(200).send(foundCourses);
    })
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// Get all courses
courseRouter.get("/", (req, res, next) => {
  Course.find({})
    .then((courses) => {
      return res.status(200).send(courses);
    })
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// Add a new course
courseRouter.post("/", (req, res, next) => {
  req.body.user = req.auth._id;
  const newCourse = new Course(req.body);
  newCourse
    .save()
    .then((savedCourse) => {
      // console.log(savedCourse) // if want to console.log for testing it must be inside the .then
      return res.status(201).send(savedCourse);
    })
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// Delete a course
courseRouter.delete("/:courseId", (req, res, next) => {
  Course.findOneAndDelete({ _id: req.params.courseId, user: req.auth._id })
    .then((deletedCourse) => {
      if (!deletedCourse) {
        return res.status(404).send("Course not found");
      }
      return res
        .status(200)
        .send(
          `Successfully deleted Course: ${deletedCourse.courseName} from the database`
        );
    })
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// Update/Edit a course's info
courseRouter.put("/:courseId", (req, res, next) => {
  Course.findOneAndUpdate(
    { _id: req.params.courseId, user: req.auth._id },
    req.body,
    { new: true }
  )
    .then((updatedCourse) => {
      if (!updatedCourse) {
        return res.status(404).send("Course not found");
      }
      return res.status(200).send(updatedCourse);
    })
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// Update Course for votes
// Update Course for comments

module.exports = courseRouter;