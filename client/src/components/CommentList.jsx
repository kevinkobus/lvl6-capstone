import React, { useContext } from "react";
import Comment from "./Comment.jsx";
import CommentForm from "./CommentForm.jsx";
import { CourseContext } from "../context/CourseContext.jsx";

function CommentList(props) {
  const { comments, courseId } = useContext(CourseContext);

  const courseComments = comments.filter(
    (comment) => comment.course === courseId
  );

  return (
    <div className="comment-section">
      <div>
        <CommentForm />
      </div>

      {courseComments.map((comment) => (
        <Comment {...comment} key={comment._id} />
      ))}
    </div>
  );
}

export default CommentList;
