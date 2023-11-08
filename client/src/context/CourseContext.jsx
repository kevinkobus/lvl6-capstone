import React, { useState, createContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const CourseContext = createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function CourseContextProvider(props) {
  // console.log("Render CourseContext")

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

  // "Yes" voting a course
  function clickYesVote(courseId) {
    userAxios
      .put(`/api/gatekeeper/course/yesVote/${courseId}`)
      .then((res) => {
        setUserCourseState((prevState) => ({
          ...prevState,
          courses: prevState.courses.map((course) =>
            course._id === courseId ? res.data : course
          ),
        }));
        setPublicCourseState((prevState) => ({
          ...prevState,
          publicCourses: prevState.publicCourses.map((course) =>
            course._id === courseId ? res.data : course
          ),
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // "No" voting a course
  function clickNoVote(courseId) {
    userAxios
      .put(`/api/gatekeeper/course/noVote/${courseId}`)
      .then((res) => {
        setUserCourseState((prevState) => ({
          ...prevState,
          courses: prevState.courses.map((course) =>
            course._id === courseId ? res.data : course
          ),
        }));
        setPublicCourseState((prevState) => ({
          ...prevState,
          publicCourses: prevState.publicCourses.map((course) =>
            course._id === courseId ? res.data : course
          ),
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  
  return (
    <CourseContext.Provider
      value={{
        userAxios,
        ...userCourseState,
        ...publicCourseState,
        addUserCourse,
        getUserCourses,
        getPublicCourses,
        deleteCourse,
        editCourse,
        clickYesVote,
        clickNoVote,
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
}

export { CourseContextProvider, CourseContext };