import React, { useState, createContext, useContext } from "react";
import axios from "axios";
import { GolferContext } from "./GolferContext";

const CourseContext = createContext();

const golferAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function CourseContextProvider(props) {
  // const {
  //   golfer: { username }
  //  } = useContext(GolferContext)

  // State for Courses
  // Setting the initial state for golfer and public issues
  const initGolferCourseState = {
    courses: [],
  };
  const initAllCourseState = {
    allCourses: [],
  };

  // Setting state for golfer and all courses
  const [golferCourseState, setGolferCourseState] = useState(
    initGolferCourseState
  );

  const [allCourseState, setAllCourseState] = useState(initAllCourseState);

  // State for Comments
  // Setting the initial state of comments
  const initComment = {
    comments: [],
  };

  // Setting state for comments
  const [commentState, setCommentState] = useState(initComment);

  // Functions for Courses
  // Add Course
  function addGolferCourse(newCourse) {
    golferAxios
      .post("/api/course", newGolfer)
      // .then((res) => console.log(res))
      .then((res) => {
        setGolferCourseState((prevState) => ({
          ...prevState,
          courses: [...prevState.courses, res.data],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Getting user courses
  function getGolferCourses() {
    golferAxios
      .get("/api/course/golfer")
      .then((res) => {
        setGolferCourseState((prevState) => ({
          ...prevState,
          courses: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Get user courses and associated comments
  // function getGolferCourses() {
  //   golferAxios
  //     .get("/api/course/golfer")
  //     .then((res) => {
  //       Promise.all(
  //         res.data.map(async (course) => {
  //           return {
  //             ...course,
  //             comments: await getCourseComments(course._id).then((comments) => {
  //               return course.comments;
  //             }),
  //           };
  //         })
  //       );
  //       setGolferCourseState((prevState) => ({
  //         ...prevState,
  //         courses: res.data,
  //       }));
  //     })
  //     .catch((err) => console.log(err.response.data.errMsg));
  // }

  // Getting all (public page) courses and their comments
  function getAllCourses() {
    golferAxios
      .get("/api/course")
      .then((res) => {
        setAllCourseState((prevState) => ({
          ...prevState,
          allCourses: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Deleting a golfer course (and eventually its comments?)
  function deleteCourse(courseId) {
    golferAxios
      .delete(`/api/course/${courseId}`)
      .then((res) => {
        setGolferCourseState((prevState) => ({
          ...prevState,
          courses: prevState.courses.filter(
            (course) => course._id !== courseId
          ),
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Editing a golfer issue
  function editCourse(courseId, updatedCourse) {
    golferAxios
      .put(`/api/golfer/${golferId}`, updatedCourse)
      .then((res) => {
        setGolferCourseState((prevState) => ({
          ...prevState,
          courses: prevState.courses.map((course) =>
            course._id === courseId ? res.data : course
          ),
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // "Liking" a course
  //   function like(courseId) {
  //     golferAxios
  //       .put(`/api/course/${courseId}/like`)
  //       .then((res) => {
  //         // console.log(res.data);
  //         setAllCourseState((prevState) =>
  //           prevState.map((course) => (courseId !== course._id ? course : res.data))
  //         );
  //         setGolferCourseState((prevState) => ({
  //           ...prevState,
  //           courses: prevState.courses.map((course) =>
  //             courseId !== course._id ? course : res.data
  //           ),
  //         }));
  //         console.log(allCourses);
  //       })
  //       .catch((err) => console.log(err));
  //   }

  // "Dis-liking" a course
  //   function dislike(issueId) {
  //     golferAxios
  //       .put(`/api/course/${courseId}/dislike`)
  //       .then((res) => {
  //         setAllCourseState((prevState) =>
  //           prevState.map((course) => (courseId !== course._id ? course : res.data))
  //         );
  //         setGolferCourseState((prevState) => ({
  //           ...prevState,
  //           issues: prevState.issues.map((issue) =>
  //             issueId !== issue._id ? issue : res.data
  //           ),
  //         }));
  //         console.log(allIssues);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }

  // console.log(golferCourseState)

  // Getting all comments for testing purposes
  function getAllComments() {
    userAxios
      .get("/api/comment")
      .then((res) => {
        setCommentState((prevState) => ({
          ...prevState,
          comments: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Get comments for an individual course
  function getCourseComments(courseId) {
    golferAxios
      .get(`/api/comment/${courseId}`)
      .then((res) => {
        setCommentState((prevState) => ({
          ...prevState,
          comments: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  //   Add a new comment to a course
  function addComment(courseId, newComment) {
    golferAxios
      .post(`/api/comment/${courseId}`, newComment)
      // .then((res) => console.log(res))
      .then((res) => {
        setCommentState((prevState) => ({
          ...prevState,
          comments: [...prevState, res.data],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  return (
    <CourseContext.Provider
      value={{
        ...golferCourseState,
        ...allCourseState,
        addGolferCourse,
        getGolferCourses,
        getAllCourses,
        deleteCourse,
        editCourse,
        // "Liking" a course,
        // "Dis-liking" a course,
        ...commentState,
        getAllComments,
        getCourseComments,
        addComment,
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
}

export { CourseContextProvider, CourseContext };
