import React, { useContext } from "react";
// import { CourseContext } from "../context/CourseContext.jsx";
import { UserContext } from "../context/UserContext.jsx";

function Comment(props) {
  // console.log("Render Comment")

  // console.log(props)

  const { user } = useContext(UserContext);
  // console.log(user._id)

  // add username and course name to comment model so can be pulled in to show who posted the comment and create a component to show rotating comments on login screen

  return (
    <div className="comment-container">
      <h2>Comment posted by: {} </h2>
      <p><i>{props.comment}</i></p>
    </div>
  );
}

export default Comment;
