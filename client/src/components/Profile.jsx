import React, { useContext } from "react";
import CourseForm from "./CourseForm";
import CourseList from "./CourseList";
import { UserContext } from "../context/UserContext";
import { CourseContext } from "../context/CourseContext"

function Profile() {
  const {
    addUserCourse,
    courses,
  } = useContext(CourseContext);

  const {
    user: { username }
  } = useContext(UserContext)

  return (
    <div className="profile">
      <h1>Welcome {username}!</h1>
      <h3>Add an Course</h3>
      <CourseForm 
          addUserIssue={addUserCourse} 
          btnText="Add Course" 
          />
      <h3>Your Courses</h3>
      <CourseList coursess={courses} />
    </div>
  );
}

export default Profile;