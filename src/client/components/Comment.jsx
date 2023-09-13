import React from "react";

function Comment(props) {

  const { comment } = props

  return (
  <div className="comment-container">
    <h2>Comments:</h2>
    <p>{comment}</p>
  </div>
    )
}

export default Comment;