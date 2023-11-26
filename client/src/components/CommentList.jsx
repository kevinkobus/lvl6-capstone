import React, { useContext, useEffect } from "react";
import Comment from "./Comment.jsx";
import CommentForm from "./CommentForm.jsx";
// import { CourseContext } from "../context/CourseContext.jsx";
import { CommentContext } from "../context/CommentContext";
// import { UserContext } from "../context/UserContext.jsx";

function CommentList(props) {
  // console.log("Render CommentList");

  const { courseId } = props;
  // console.log(courseId)

  const { getAllComments, comments } = useContext(CommentContext);

  useEffect(() => {
    getAllComments();
  }, []);

  // console.log(comments)
// console.log(typeof(comments))
  // Filter the comments for each course
  const courseComments = comments.filter(
    (comment) => comment.course === courseId
  );
  // console.log(courseComments)

  return (
    <div className="comment-section">
      <div>
        <CommentForm courseId={courseId} />
      </div>

      {courseComments.map((comment) => (
        <Comment {...comment} key={comment._id} courseId={courseId} />
      ))}
    </div>
  );
}

export default CommentList;
