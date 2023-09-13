import React, { useContext } from "react";
import Comment from "./Comment.jsx";
import CommentForm from "./CommentForm.jsx"
import { IssuesContext } from "../context/CourseContext.jsx";

function CommentList(props) {
  const { comments } = useContext(IssuesContext);
  // const {} = props;


  // console.dir(comments);

  return (
    <div className="comment-section">
      <div>
        <CommentForm />
      </div>
      
      {comments.map((comment) => (
        <Comment
         {...comment} 
         key={comment._id}
          />
      ))}
    </div>
  );
}

export default CommentList;
