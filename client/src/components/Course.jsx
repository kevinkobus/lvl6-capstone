import React, { useContext, useState } from "react";
import CourseForm from "./CourseForm";
import { CourseContext } from "../context/CourseContext";
import CommentList from "./CommentList";




function Course(props) {
// console.log("Render Course")

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

  function handleYesVote(e) {
    e.preventDefault()
    clickYesVote(_id)
  }

  function handleNoVote(e) {
    e.preventDefault()
    clickNoVote(_id)
  }

  return (
    <div className="course-grid-container">
      {!editToggle ? (
        <>
          <div className="course-grid">
            <div className="course-grid-box1">
              <h1>{courseName}</h1>
              <h3>{city}, {state}</h3>
              <h3>Par: {par}</h3>
              <h3>Best Score: {score}</h3>
              <h3>Website: {website}</h3>
              {/* <h3>Posted by: {createdBy</h3> */}
            </div>
            <div className="course-grid-box2">
              <h4>Do you like this course?</h4>
              <button id="yes-btn" onClick={handleYesVote}>
                Yes
              </button>
              <p className="vote-yes">Yes votes: {yesVote.length}</p>
              <button id="no-btn" onClick={handleNoVote}>
                No
              </button>
              <p className="vote-no">No votes: {noVote.length}</p>
            </div>
            <div className="course-grid-box3">
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
          <CommentList
            courseId={_id}
          />
        </>
      ) : (
        <>
          <CourseForm
            type="edit"
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