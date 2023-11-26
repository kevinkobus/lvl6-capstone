import React, { useState, createContext } from "react";
import axios from "axios";
// import { UserContext } from "./UserContext";

const CommentContext = createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function CommentContextProvider(props) {

// State for Comments
  // Setting the initial state of comments
  const initCommentState = {
    comments: [],
  };

  // Setting state for comments
  const [commentState, setCommentState] = useState(initCommentState);

  // Getting all comments
  
  function getAllComments() {
    userAxios
      .get("/api/gatekeeper/comment")
      .then((res) => {
        setCommentState((prevState) => ({
          ...prevState,
          comments: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }
  

  
  // Adding a comment
  function addComment(courseId, newComment) {
    userAxios
      .post(`/api/gatekeeper/comment/${courseId}`, newComment)
      .then((res) => {
        // console.log(res);
        setCommentState((prevState) => ({
          ...prevState,
          comments: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Editing a comment
  // Deleting a comment

  return (
    <CommentContext.Provider
      value={{
        ...commentState,
        getAllComments,
        addComment,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
}

export { CommentContextProvider, CommentContext };