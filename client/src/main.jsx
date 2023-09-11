import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./css/style.css";
import { GolferContextProvider } from "./context/UserContext";
import { CourseContextProvider } from "./contextCourseContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CourseContextProvider>
        <GolferContextProvider>
          <App />
        </GolferContextProvider>
      </CourseContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
