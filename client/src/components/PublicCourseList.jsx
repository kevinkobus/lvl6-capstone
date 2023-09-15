import React, { useContext, useEffect } from "react";
import PublicCourse from "./PublicCourse.jsx";
import { CourseContext } from "../context/CourseContext.jsx";

function PublicCourseList() {
  const { publicCourses, getPublicCourses } = useContext(CourseContext);

  useEffect(() => {
    getPublicCourses();
  }, []);

  return (
    <div className="public-course-list">
      {publicCourses.map((publicCourse) => (
          <PublicCourse 
          {...publicCourse} 
          key={publicCourse._id} 
          
        />
      ))}
    </div>
  );
}

export default PublicCourseList