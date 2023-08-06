import React from "react";
import Course from "./Course";

function CourseList(props) {
  const { golfCourses } = props;
  return (
    <div className="course-list">
      {golfCourses.map((course) => (
        <Course {...course} key={course._id} />
      ))}
    </div>
  );
}

export default CourseList;