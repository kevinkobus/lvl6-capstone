import React, { useContext } from "react";
import { CourseContext } from "../context/CourseContext.jsx";
import { UserContext } from "../context/UserContext.jsx";

function Comment(props) {
  // console.log("Render Comment")

  // console.log(props)

  // const {
  //   user: { username },
  // } = useContext(CourseContext);

 
  

  return (
  <div className="comment-container">
    <h2>Comment posted by:  </h2>
    <p>{props.comment}</p>
  </div>
    )
}

export default Comment;