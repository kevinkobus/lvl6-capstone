const express = require("express");
const courseRouter = express.Router();
const Course = require("../models/course.js");

// POST - Add new course to the DB
courseRouter.post("/", (req, res, next) => {
      // check if the course already exists, return error msg if it does
  Course.findOne({ username: req.body.courseName.toLowerCase() })
    if (course) {
        res.status(403);
        return next(new Error("This Golf Course already exists"));
      }
  const newCourse = new Course(req.body);
  newCourse
    .save()
    .then((savedCourse) => {
      return res.status(200).send(savedCourse);
    })
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// Get courses played by user id
courseRouter.get("/user", (req, res, next) => {
    Course.find({ user: req.auth._id })
      .then((foundCourses) => {
        if (!foundCourses) {
          return res.status(404).send("No courses found under golfer");
        }
        return res.status(200).send(foundCourses);
      })
      .catch((err) => {
        res.status(500);
        return next(err);
      });
  });


// GET - Pull up one course
// courseRouter.get("/:courseID", (req, res, next) => {
//   Course.findById({ _id: req.params.courseId })
//     .then((foundCourse) => {
//       if (!foundCourse) {
//         return res.status(404).send("Course not found");
//       }
//       return res.status(200).send(foundCourse);
//     })
//     .catch((err) => {
//       res.status(500);
//       return next(err);
//     });
// });

// GET all courses
// courseRouter.get("/", (req, res, next) => {
//   Course.find({})
//     .then((courses) => {
//       return res.status(200).send(courses);
//     })
//     .catch((err) => {
//       res.status(500);
//       return next(err);
//     });
// });

// Like a course
// courseRouter.put("/like/:courseID", (req, res, next) => {
//   Course.findOneAndUpdate(
//     { _id: req.params.courseID }, // find this course
//     { $inc: { likes: 1 } }, // increment the likes by 1
//     { new: true }) // send the updated version
//     .then((updatedCourse) => {
//       if (!updatedCourse) {
//         return res.status(404).send("Course not found");
//       }
//       return res.status(200).send(updatedCourse);
//     })
//     .catch((err) => {
//       res.status(500);
//       return next(err);
//     });
// });

module.exports = courseRouter;

// Get Course(s) by search term
// courseRouter.get("/search", (req, res, next) => {
//   const { course } = req.query
//   const pattern = new RegExp(course)
//   Course.find(
//     { name: { $regex: pattern, $options: "i" } }),
//     .then((courses) => {
//       if(!courses){
//         return res.status(404).send("Nothing found matching search criteria")
//       }
//       return res.status(200).send(courses)
//     })
//     .catch((err) => {
//       res.status(500)
//       return next(err)
//     })
// })

// find courses by "likes" range (gte = greater)
// courseRouter.get("/search/bylikes", (req, res, next) => {
//  Course.where("likes").gte(5).exec(() => {
//  .then((courses) => {
//       if(!courses){
//         return res.status(404).send("Nothing found matching search criteria")
//       }
//       return res.status(200).send(courses)
//     })
//     .catch((err) => {
//       res.status(500)
//       return next(err)
// })
// })
// })