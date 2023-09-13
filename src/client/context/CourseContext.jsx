import React, { useState, createContext, useContext } from "react";
import axios from "axios";
// import { UserContext } from "./UserContext"

const IssuesContext = createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function CourseContextProvider(props) {

// const { 
//   user: { username }
//  } = useContext(UserContext)

  // State for Issues
  // Setting the initial state for user and public issues
  const initUserIssueState = {
    issues: [],
  };
  const initPublicIssueState = {
    publicIssues: [],
  };

  // Setting state for user and public issues
  const [userIssueState, setUserIssueState] = useState(initUserIssueState);
  const [publicIssueState, setPublicIssueState] =
    useState(initPublicIssueState);

  // State for Comments
  // Setting the initial state of comments
  const initComment = {
    comments: [],
  };

  // Setting state for comments
  const [commentState, setCommentState] = useState(initComment);

  // Functions for Issues
  // Add Issue
  function addUserIssue(newIssue) {
    userAxios
      .post("/api/issue", newIssue)
      // .then((res) => console.log(res))
      .then((res) => {
        setUserIssueState((prevState) => ({
          ...prevState,
          issues: [...prevState.issues, res.data],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Getting user issues
  function getUserIssues() {
    userAxios
      .get("/api/issue/user")
      .then((res) => {
        setUserIssueState((prevState) => ({
          ...prevState,
          issues: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Get user issues and associated comments
  // function getUserIssues() {
  //   userAxios
  //     .get("/api/issue/user")
  //     .then((res) => {
  //       Promise.all(
  //         res.data.map(async (issue) => {
  //           return {
  //             ...issue,
  //             comments: await getIssueComments(issue._id).then((comments) => {
  //               return issue.comments;
  //             }),
  //           };
  //         })
  //       );
  //       setUserIssueState((prevState) => ({
  //         ...prevState,
  //         issues: res.data,
  //       }));
  //     })
  //     .catch((err) => console.log(err.response.data.errMsg));
  // }

  // Getting all (public) issues and their comments
  function getPublicIssues() {
    userAxios
      .get("/api/issue")
      .then((res) => {
        setPublicIssueState((prevState) => ({
          ...prevState,
          publicIssues: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Deleting a user issue (and eventually its comments?)
  function deleteIssue(issueId) {
    userAxios
      .delete(`/api/issue/${issueId}`)
      .then((res) => {
        setUserIssueState((prevState) => ({
          ...prevState,
          issues: prevState.issues.filter((issue) => issue._id !== issueId),
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Editing a user issue
  function editIssue(issueId, updatedIssue) {
    userAxios
      .put(`/api/issue/${issueId}`, updatedIssue)
      .then((res) => {
        setUserIssueState((prevState) => ({
          ...prevState,
          issues: prevState.issues.map((issue) =>
            issue._id === issueId ? res.data : issue
          ),
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // "Yes" voting an issue
  //   function yesVote(issueId) {
  //     userAxios
  //       .put(`/api/issue/${issueId}/yesVote`)
  //       .then((res) => {
  //         // console.log(res.data);
  //         setAllIssues((prevIssues) =>
  //           prevIssues.map((issue) => (issueId !== issue._id ? issue : res.data))
  //         );
  //         setUserState((prevUserState) => ({
  //           ...prevUserState,
  //           issues: prevUserState.issues.map((issue) =>
  //             issueId !== issue._id ? issue : res.data
  //           ),
  //         }));
  //         console.log(allIssues);
  //       })
  //       .catch((err) => console.log(err));
  //   }

  // "No" voting an issue
  //   function noVote(issueId) {
  //     userAxios
  //       .put(`/api/issue/${issueId}/noVote`)
  //       .then((res) => {
  //         setAllIssues((prevIssues) =>
  //           prevIssues.map((issue) => (issueId !== issue._id ? issue : res.data))
  //         );
  //         setUserState((prevUserState) => ({
  //           ...prevUserState,
  //           issues: prevUserState.issues.map((issue) =>
  //             issueId !== issue._id ? issue : res.data
  //           ),
  //         }));
  //         console.log(allIssues);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }

  // console.log(userIssueState)

  // Getting all comments for testing purposes
  function getAllComments() {
    userAxios
      .get("/api/comment")
      .then((res) => {
        setCommentState((prevState) => ({
          ...prevState,
          comments: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // Get comments for an individual issue for testing purposes
  function getIssueComments(issueId) {
    userAxios
      .get(`/api/comment/${issueId}`)
      .then((res) => {
        setCommentState((prevState) => ({
          ...prevState,
          comments: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function addComment(newComment) {
    userAxios
      .post("/api/comment", newComment)
      // .then((res) => console.log(res))
      .then((res) => {
        setCommentState((prevState) => ({
          ...prevState,
          comments: [...prevState, res.data],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  return (
    <IssuesContext.Provider
      value={{
        ...userIssueState,
        ...publicIssueState,
        addUserIssue,
        getUserIssues,
        getPublicIssues,
        deleteIssue,
        editIssue,
        // "Yes" voting an issue,
        // "No" voting an issue,
        ...commentState,
        getAllComments,
        getIssueComments,
        addComment,
      }}
    >
      {props.children}
    </IssuesContext.Provider>
  );
}

export { CourseContextProvider, CourseContext };