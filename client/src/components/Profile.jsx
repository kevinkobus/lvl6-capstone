import React, { useContext } from "react";
import CourseForm from "./CourseForm";
import CourseList from "./CourseList";
import Course from "./Course";
import { UserContext } from "../context/UserContext";

function Profile() {
  const {
    user: { username },
    addGolfCourse,
    golfCourses,
  } = useContext(UserContext);

  return (
    <div className="profile">
      <h1>Welcome {username}!</h1>
      <h3>Add an Issue</h3>
      <CourseForm addGolfCourse={addGolfCourse} />
      <h3>Your Issues</h3>
      <CourseList golfCourses={golfCourses} />
    </div>
  );
}

export default Profile;