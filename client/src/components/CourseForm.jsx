import React, { useState, useContext } from "react";
import { CourseContext } from "../context/CourseContext";

function CourseForm(props) {
  const { addUserCourse } = useContext(CourseContext);

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

  const { courseName, state, city, par, score, website } = inputs;
  return (
    <div className="course-form-container">
      <form onSubmit={handleSubmit} className="course-form">
        <input
          type="text"
          name="courseName"
          value={courseName}
          onChange={handleChange}
          placeholder="Course Name"
        />
        <input
          type="text"
          name="state"
          value={state}
          onChange={handleChange}
          placeholder="State"
        />
        <input
          type="text"
          name="city"
          value={city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="number"
          name="par"
          value={par}
          onChange={handleChange}
          placeholder="Par"
        />
        <input
          type="number"
          name="score"
          value={score}
          onChange={handleChange}
          placeholder="Score"
        />
        <input
          type="text"
          name="website"
          value={website}
          onChange={handleChange}
          placeholder="Website"
        />
        <button id="add-course-btn">{props.btnText}</button>
      </form>
    </div>
  );
}

export default CourseForm;
