import React, { useContext } from "react";
import CommentList from "./CommentList";
import { CourseContext } from "../context/CourseContext";

function PublicCourse(props) {
// console.log("Render PublicCourse")

  const { courseName, state, city, par, score, website, _id, yesVote, noVote } =
    props;

  const { clickYesVote, clickNoVote } = useContext(CourseContext);

  function handleYesVote(e) {
    e.preventDefault();
    clickYesVote(_id);
  }

  function handleNoVote(e) {
    e.preventDefault();
    clickNoVote(_id);
  }

  return (
    <div className="course-grid-container">
      <div className="course-grid">
        <div className="course-grid-box1">
          <h1>{courseName}</h1>
          <h3>{city}, {state}</h3>
          <h3>Par: {par}</h3>
          <h3>Best Score: {score}</h3>
          <h3>Website: {website}</h3>
          {/* <h3>Posted by: {createdBy} </h3> */}
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
          <p className="vote-no">No votes: {noVote.length} </p>
        </div>
      </div>
      <CommentList />
    </div>
  );
}

export default PublicCourse;
