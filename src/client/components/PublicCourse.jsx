import React from "react";
// import { Link } from "react-router-dom";

function PublicCourse(props) {
  
  const { title, description, _id } = props;

  return (
    <div className="course">
      <div className="course-info">
        <h1>Course: {title}</h1>
        <h3>Description: {description}</h3>
      </div>
      <div className="course-btns">
        <h4>Is this a good course</h4>
        <button>Yes (0)</button>
        <button>No (0)</button>
      </div>
      <h3>View or add comment(s) on this course</h3>
      {/* <Link to="/comments">Comments</Link> */}
    </div>
  );
}

export default PublicCourse;