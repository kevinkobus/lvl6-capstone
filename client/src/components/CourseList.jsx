import React, { useContext, useEffect } from "react";
import Course from "./Course.jsx";
import { CourseContext } from "../context/CourseContext.jsx";
import { UserContext } from "../context/UserContext.jsx";

function CourseList(props) {
  const { courses, getUserCourses } = useContext(CourseContext);

  const {
    user: { username }
  } = useContext(UserContext)

  const {handleChange, handleSubmit } = props

  useEffect(() => {
    getUserCourses();
  }, []);

  return (
    <div className="course-list">
      {courses.map((course) => (
        <Course
          {...course}
          key={course._id}
          username={username}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ))}
    </div>
  );
}

export default CourseList;