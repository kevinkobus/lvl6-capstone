import React, { useContext, useState } from "react";
import CourseForm from "./CourseForm";
import { CourseContext } from "../context/CourseContext";
import CommentList from "./CommentList";

function Course(props) {
  const { courseName, state, city, par, score, website, _id, noVote, yesVote } =
    props;

  const { deleteCourse, editCourse, clickYesVote, clickNoVote } =
    useContext(CourseContext);

  const [editToggle, setEditToggle] = useState(false);

  const [editInputs, setEditInputs] = useState({
    courseName: courseName,
    state: state,
    city: city,
    par: par,
    score: score,
    website: website,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setEditInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleCourseEdit(e) {
    e.preventDefault();
    editCourse(_id, editInputs);
    setEditToggle(!editToggle);
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
              <button id="yes-btn" onClick={() => clickYesVote(_id)}>
                Yes
              </button>
              <p>Yes votes: {yesVote.length}</p>
              <button id="no-btn" onClick={() => clickNoVote(_id)}>
                No
              </button>
              <p>No votes: {noVote.length}</p>
            </div>
            <div className="course-box3">
              <button
                id="edit-course-btn"
                onClick={() => setEditToggle((prevToggle) => !prevToggle)}
              >
                Edit
              </button>
              <button id="delete-course-btn" onClick={() => deleteCourse(_id)}>
                Delete
              </button>
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
            inputs={editInputs}
            _id={_id}
            btnText="Save Edit"
            submit={handleCourseEdit}
            editToggle={editToggle}
            handleChange={handleChange}
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