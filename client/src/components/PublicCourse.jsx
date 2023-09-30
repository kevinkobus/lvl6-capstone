import React, { useContext } from "react";
import CommentList from "./CommentList";
import { CourseContext } from "../context/CourseContext"

function PublicCourse(props) {
  const { courseName, state, city, par, score, website, _id, yesVote, noVote } = props;

const { courses, createdBy } = useContext(CourseContext)

  return (
    <div className="course-box">
      <div className="course-box1">
        <h1>Course: {courseName}</h1>
        <h3>State: {state}</h3>
        <h3>City: {city}</h3>
        <h3>Par: {par}</h3>
        <h3>Best Score: {score}</h3>
        <h3>Website: {website}</h3>
        <h3>Posted by: {createdBy} </h3>
      </div>
      <div className="course-box2">
        <h4>Do you like this course?</h4>
        <button id="yes-btn">Yes</button>
        <p>Yes votes: {yesVote.length}</p>
        <button id="no-btn">No</button>
        <p>No votes: {noVote.length} </p>
      </div>
      <CommentList />
    </div>
  );
}

export default PublicCourse;