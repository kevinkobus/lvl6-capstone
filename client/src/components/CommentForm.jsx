import React, { useState, useContext } from "react";
import { CourseContext } from "../context/CourseContext";
import { UserContext } from "../context/UserContext";

function CommentForm(props) {
// console.log("Render Comment Form")

const { courseId } = props

  const { addComment, comment, getAllComments } = useContext(CourseContext);
  // const {
  //   user: { username },
  // } = useContext(UserContext);

  const initCommentInput = "";
  const [commentInput, setCommentInput] = useState(initCommentInput);

  const [commentOpen, setCommentOpen] = useState(false);

  function handleCommentChange(e) {
    const { value } = e.target;
    // console.log(value)
    setCommentInput(value);
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    const newComment = {
      comment,
      courseId,
    };
    addComment(newComment, courseId)
      .then(() => {
        setCommentInput(initCommentInput);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function handleToggle() {
    setCommentOpen(!commentOpen);
    // getCourseComments(courseId)
    getAllComments(courseId)
  }

  return (
    <>
      <div className="comment-toggle-btn" onClick={handleToggle}>
        {commentOpen ? "Close Comment section🔼 " : "Leave a Comment 🔽"}
      </div>
      {commentOpen && (
        <div className="comment-form-container">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              id="comment-input"
              maxLength="160"
              name="comment"
              type="text"
              value={commentInput} // or should this be just comment from the new comment object?
              onChange={handleCommentChange}
              placeholder="Add a comment...160 character max"
            />
            <button id="post-comment-btn"type="submit">Post Comment</button>
          </form>
        </div>
      )}
      <h3>Comments:</h3>

    </>
  );
}

export default CommentForm;