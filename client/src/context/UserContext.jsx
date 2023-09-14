import React, { useState, createContext, useContext } from "react";
import axios from "axios";
import { CourseContext } from "./CourseContext";

// Declaring context as a variable to export
const UserContext = createContext();

// Creating another version of axios to intercept user token so it gets passed with the authorization header
const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Creating context provider for user signup/login and authentication to export
function UserContextProvider(props) {

  const { getUserCourses, getPublicCourses } = useContext(CourseContext);

  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    issues: [],
  };

  // Setting state for user's info and set initState from above as default
  const [userState, setUserState] = useState(initState);

  // User signup
  function signup(credentials) {
    axios
      .post("/api/auth/signup", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token); //saving the token data to localStorage so not to lose it after browser refresh
        localStorage.setItem("user", JSON.stringify(user)); //saving the user data to localStorage so not to lose it after browser refresh
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      // .catch(err => console.dir(err))
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  // User login
  function login(credentials) {
    axios
      .post("/api/auth/login", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token); //saving the token data to localStorage so not to lose it after browser refresh
        localStorage.setItem("user", JSON.stringify(user)); //saving the user data to localStorage so not to lose it after browser refresh
        getUserCourses();
        getPublicCourses();
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      // .catch(err => console.dir(err))
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  // User logout which removes user info from localStorage and resets state
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState({
      user: {},
      token: "",
      issues: [],
    });
  }

  //   // Update user information (if a user wants to change something about their username or password)

  //   function updateUser(updatedUser) {
  //     userAxios.put("/api/user", updatedUser)
  //         .then(res => {
  //             localStorage.setItem("user", JSON.stringify(res.data))
  //             setUserState(prevUserState => ({
  //                 ...prevUserState,
  //                 user: res.data
  //             }))
  //         })
  //         .catch(err => console.log(err))
  // }

  // Handling Errors
  function handleAuthErr(errMsg) {
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }

  // Reseting the authorization error
  function resetAuthErr() {
    setUserState((prevState) => ({
      ...prevState,
      errMsg: "",
    }));
  }

  //   returning/providing the userState and other values to be consumed by any component that imports them
  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        handleAuthErr,
        resetAuthErr,
        // updateUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };