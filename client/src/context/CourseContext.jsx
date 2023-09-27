import React, { useState, createContext } from "react";
import axios from "axios";
// import { UserContext } from "./UserContext"

const CourseContext = createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function CourseContextProvider(props) {
  // State for Courses

  // Setting the initial state for user and all courses
  const initUserCourseState = {
    courses: [],
  };
  const initPublicCourseState = {
    publicCourses: [],
  };

  // Setting state for user and all courses
  const [userCourseState, setUserCourseState] = useState(initUserCourseState);
  const [publicCourseState, setPublicCourseState] = useState(
    initPublicCourseState
  );

  // State for Comments
  // Setting the initial state of comments
  const initCommentState = {
    comments: [],
  };

  // Setting state for comments
  const [commentState, setCommentState] = useState(initCommentState);

  // Functions for Courses

  // Add Course
  function addUserCourse(newCourse) {
    userAxios
      .post("/api/gatekeeper/course", newCourse)
      // .then((res) => console.log(res))
      .then((res) => {
        setUserCourseState((prevState) => ({
          ...prevState,
          courses: [...prevState.courses, res.data],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Getting user courses
  function getUserCourses() {
    userAxios
      .get("/api/gatekeeper/course/user")
      .then((res) => {
        setUserCourseState((prevState) => ({
          ...prevState,
          courses: res.data,
        }));
      })
      .catch((err) => console.log(err));
    // .catch((err) => console.log(err.response.data.errMsg));
  }

  // Getting all (public) courses and their comments
  function getPublicCourses() {
    userAxios
      .get("/api/gatekeeper/course")
      .then((res) => {
        setPublicCourseState((prevState) => ({
          ...prevState,
          publicCourses: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Deleting a user course (and eventually its comments?)
  function deleteCourse(courseId) {
    userAxios
      .delete(`/api/gatekeeper/course/${courseId}`)
      .then((res) => {
        setUserCourseState((prevState) => ({
          ...prevState,
          courses: prevState.courses.filter(
            (course) => course._id !== courseId
          ),
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Editing a user course
  function editCourse(courseId, updatedCourse) {
    console.log('inside editcourse in context', 'courseId', courseId, 'updated course', updatedCourse)
    userAxios
      .put(`/api/gatekeeper/course/${courseId}`, updatedCourse)
      .then((res) => {
        setUserCourseState((prevState) => ({
          ...prevState,
          courses: prevState.courses.map((course) =>
            course._id === courseId ? res.data : course
          ),
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // "Yes" voting an course
  //   function yesVote(courseId) {
  //     userAxios
  //       .put(`/api/gatekeeper/course/${courseId}/yesVote`)
  //       .then((res) => {
  //         // console.log(res.data);
  //         setAllCourses((prevCourses) =>
  //           prevCourses.map((course) => (courseId !== course._id ? course : res.data))
  //         );
  //         setUserState((prevUserState) => ({
  //           ...prevUserState,
  //           courses: prevUserState.courses.map((course) =>
  //             courseId !== course._id ? course : res.data
  //           ),
  //         }));
  //         console.log(allCourses);
  //       })
  //       .catch((err) => console.log(err));
  //   }

  // "No" voting an course
  //   function noVote(courseId) {
  //     userAxios
  //       .put(`/api/gatekeeper/course/${courseId}/noVote`)
  //       .then((res) => {
  //         setAllCourses((prevCourses) =>
  //           prevCourses.map((course) => (courseId !== course._id ? course : res.data))
  //         );
  //         setUserState((prevUserState) => ({
  //           ...prevUserState,
  //           courses: prevUserState.courses.map((course) =>
  //             courseId !== course._id ? course : res.data
  //           ),
  //         }));
  //         console.log(allCourses);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }

  // console.log(userCourseState)

  // ----------- CRUD for Comments ------------

  // Getting all comments for testing purposes
  function getAllComments() {
    userAxios
      .get("/api/gatekeeper/comment")
      .then((res) => {
        setCommentState((prevState) => ({
          ...prevState,
          comments: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Get comments for an individual course for testing purposes
  function getCourseComments(courseId) {
    userAxios
      .get(`/api/gatekeeper/comment/${courseId}`)
      .then((res) => {
        setCommentState((prevState) => ({
          ...prevState,
          comments: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function addComment(newComment) {
    userAxios
      .post(`/api/gatekeeper/comment/${courseId}`, newComment)
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
        ...userCourseState,
        ...publicCourseState,
        addUserCourse,
        getUserCourses,
        getPublicCourses,
        deleteCourse,
        editCourse,
        // "Yes" voting a course,
        // "No" voting a course,
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
