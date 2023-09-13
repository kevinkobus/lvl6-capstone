import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import "./css/styles.css";
import { UserContextProvider } from "./context/UserContext";
import { CoursesContextProvider } from "./context/CoursesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CoursesContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </CoursesContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
