import React, { useContext } from "react";
import { CourseContext } from "../context/CourseContext.jsx";
import { UserContext } from "../context/UserContext.jsx";

function Comment(props) {
  // console.log(props)

  const {
    user: { username },
  } = useContext(CourseContext);

  const { comment } = props
  

  return (
  <div className="comment-container">
    <h2>Comment posted by: {username} </h2>
    <p>{comment}</p>
  </div>
    )
}

export default Comment;