import React, { useState, createContext, useContext } from "react";
import axios from "axios";
import { CourseContext } from "./CourseContext";

// Declaring context as a variable to export
const GolferContext = createContext();

// Creating another version of axios to intercept user token so it gets passed with the authorization header
const golferAxios = axios.create();

golferAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Creating context provider for golfer signup/login and authentication to export
function GolferContextProvider(props) {

  const { getGolferCourses, getAllCourses } = useContext(CourseContext);

  const initState = {
    golfer: JSON.parse(localStorage.getItem("golfer")) || {},
    token: localStorage.getItem("token") || "",
    courses: [],
  };

  // Setting state for user's info and set initState from above as default
  const [golferState, setGolferState] = useState(initState);

  // Golfer signup
  function signup(credentials) {
    axios
      .post("/auth/signup", credentials)
      .then((res) => {
        const { golfer, token } = res.data;
        localStorage.setItem("token", token); //saving the token data to localStorage so not to lose it after browser refresh
        localStorage.setItem("golfer", JSON.stringify(user)); //saving the user data to localStorage so not to lose it after browser refresh
        setGolferState((prevState) => ({
          ...prevState,
          golfer,
          token,
        }));
      })
      // .catch(err => console.dir(err))
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  // Golfer login
  function login(credentials) {
    axios
      .post("/auth/login", credentials)
      .then((res) => {
        const { golfer, token } = res.data;
        localStorage.setItem("token", token); //saving the token data to localStorage so not to lose it after browser refresh
        localStorage.setItem("golfer", JSON.stringify(golfer)); //saving the golfer data to localStorage so not to lose it after browser refresh
        getGolferCourses();
        getAllCourses();
        setGolferState((prevGolferState) => ({
          ...prevGolferState,
          golfer,
          token,
        }));
      })
      // .catch(err => console.dir(err))
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  // Golfer logout which removes golfer info from localStorage and resets state
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("golfer");
    setGolferState({
      golfer: {},
      token: "",
      courses: [],
    });
  }

  //   // Update golfer information (if a golfer wants to change something about their username or password)

  //   function updateGolfer(updatedGolfer) {
  //     golferAxios.put("/api/golfer", updatedGolfer)
  //         .then(res => {
  //             localStorage.setItem("golfer", JSON.stringify(res.data))
  //             setGolferState(prevState => ({
  //                 ...prevState,
  //                 user: res.data
  //             }))
  //         })
  //         .catch(err => console.log(err))
  // }

  // Handling Errors
  function handleAuthErr(errMsg) {
    setGolferState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }

  // Reseting the authorization error
  function resetAuthErr() {
    setGolferState((prevState) => ({
      ...prevState,
      errMsg: "",
    }));
  }

  //   returning/providing the userState and other values to be consumed by any component that imports them
  return (
    <GolferContext.Provider
      value={{
        ...golferState,
        signup,
        login,
        logout,
        handleAuthErr,
        resetAuthErr,
        // updateGolfer,
      }}
    >
      {props.children}
    </GolferContext.Provider>
  );
}

export { GolferContextProvider, GolferContext };