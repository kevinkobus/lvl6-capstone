import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./css/styles.css";
import { UserContextProvider } from "./context/UserContext";
import { CourseContextProvider } from "./context/CourseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CourseContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </CourseContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
