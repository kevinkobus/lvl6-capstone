import React, { useState, useContext } from "react";
// import { CourseContext } from "../context/CourseContext";
import { UserContext } from "../context/UserContext";
import { CommentContext } from "../context/CommentContext";

function CommentForm(props) {
  // console.log("Render Comment Form")
 
  const { courseId } = props;

  const { addComment, comment } = useContext(CommentContext);

  const { user } = useContext(UserContext);

  
  const [commentInput, setCommentInput] = useState("");

  const [commentOpen, setCommentOpen] = useState(false);

  function handleCommentChange(e) {
    const { value } = e.target;
    setCommentInput(value);
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    const newComment = {
      comment: commentInput,
    };
    // console.log(courseId, newComment, user._id)
    addComment(courseId, newComment);
    setCommentInput("");
  }

  function handleToggle() {
    setCommentOpen(!commentOpen);
  }

  return (
    <>
      <div className="comment-toggle-btn" onClick={handleToggle}>
        {commentOpen ? "Close Comment section🔼 " : "Post a comment about this course 🔽"}
      </div>
      {commentOpen && (
        <div className="comment-form-container">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              id="comment-input"
              maxLength="160"
              name="comment"
              type="text"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add a comment...160 character max"
            />
            <button id="post-comment-btn" type="submit">
              Post Comment
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default CommentForm;
