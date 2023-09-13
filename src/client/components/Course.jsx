import React, { useContext, useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import { CourseContext } from "../context/CourseContext";
import CommentList from "./CommentList";
// import { UserContext } from "../context/UserContext";
// import { Link } from "react-router-dom";

function Course(props) {
  // console.log(props)
  const { title, description, username, _id, handleChange, inputs, comment } =
    props;
  const { deleteCourse, editCourse, courseId, getCourseComments } =
    useContext(CourseContext);

  const [editToggle, setEditToggle] = useState(false);

  // console.log(inputs)

  function handleCourseEdit() {
    editCourse(_id, inputs);
    setEditToggle((prevToggle) => !prevToggle);
  }

  return (
    <div className="course-box">
      {!editToggle ? (
        <>
          <div className="issue-grid">
            <div className="issue-box1">
              <h1>Course: {title}</h1>
              <h3>Description: {description}</h3>
              <h3>Posted by: {username}</h3>
            </div>
            <div className="course-box2">
              <h4>Do you like this course?</h4>
              <button id="yes-btn">Yes</button>
              <p>Yes votes: 100</p>
              {/* {yesVotes} */}
              <button id="no-btn">No</button>
              <p>No votes: 100</p>
              {/* {noVotes} */}
            </div>
            <div className="course-box3">
              <button id="edit-course-btn"
                onClick={() => setEditToggle((prevToggle) => !prevToggle)}
              >
                Edit
              </button>
              <button id="delete-course-btn" onClick={() => deleteCourse(_id)}>Delete</button>
            </div>
          </div>
          <CommentList />
        </>
      ) : (
        <>
          <CourseForm
            title={title}
            description={description}
            _id={_id}
            btnText="Save Edit"
            handleChange={handleChange}
            submit={handleCourseEdit}
          />
          <button
            id="cancel-btn"
            onClick={() => setEditToggle((prevToggle) => !prevToggle)}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

export default Course;