import React, { useContext, useState } from "react";
import CourseForm from "./CourseForm";
import { CourseContext } from "../context/CourseContext";
import CommentList from "./CommentList";
// import { UserContext } from "../context/UserContext";
// import { Link } from "react-router-dom";

function Course(props) {
  // console.log(props)
  const { courseName, state, city, par, score, website, _id, handleChange, inputs } =
    props;

  const { deleteCourse, editCourse } =
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
          <div className="course-grid">
            <div className="course-box1">
              <h1>Course: {courseName}</h1>
              <h3>State: {state}</h3>
              <h3>City: {city}</h3>
              <h3>Par: {par}</h3>
              <h3>Best Score: {score}</h3>
              <h3>Website: {website}</h3>
              {/* <h3>Posted by: {username}</h3> */}
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
            courseName={courseName}
            state={state}
            city={city}
            par={par}
            score={score}
            website={website}
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