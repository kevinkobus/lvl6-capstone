import React, { useContext } from "react";
import PublicCourseList from "./PublicCourseList.jsx";
import { CourseContext } from "../context/CourseContext.jsx";

function Public() {
  const { publicCourses } = useContext(CourseContext);

  return (
    <div className="public">
      <h1 className="all-courses">All Courses</h1>
      <PublicCourseList publicCourses={publicCourses} />
    </div>
  );
}

export default Public;