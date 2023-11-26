import React, { useContext, useState } from "react";
import CourseForm from "./CourseForm";
import CourseList from "./CourseList";
import { UserContext } from "../context/UserContext";
import { CourseContext } from "../context/CourseContext"

function Profile(props) {
  // console.log("Render Profile")

  const {
    addUserCourse,
    courses,
    _id,
  } = useContext(CourseContext);

  const {
    user: { username }
  } = useContext(UserContext)

  const initInputs = {
    courseName: props.courseName || "",
    state: props.state || "",
    city: props.city || "",
    par: props.par || "",
    score: props.score || "",
    website: props.website || "",
  };

  const [inputs, setInputs] = useState(initInputs);

  function handleChange(e) {
      const { name, value } = e.target;
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }

  function handleSubmit(e) {
    e.preventDefault();
    addUserCourse(inputs);
    setInputs(initInputs);
  }

  return (
    <div className="profile">
      <h1>Welcome {username}!</h1>
      <h3>Add a Golf Course</h3>
      <CourseForm  
          btnText="Add Course" 
          submit={handleSubmit}
          handleChange={handleChange}
          inputs={inputs}
          />
      <h3>Your Courses</h3>
      <CourseList 
          courses={courses}
          _id={_id}
          />
    </div>
  );
}

export default Profile;