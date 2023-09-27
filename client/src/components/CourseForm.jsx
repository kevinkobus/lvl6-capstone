import React, { useState } from "react";
// import { CourseContext } from "../context/CourseContext";

function CourseForm(props) {

  const { inputs, submit, handleChange, btnText } = props

  // const initInputs = {
  //   courseName: props.courseName || "",
  //   state: props.state || "",
  //   city: props.city || "",
  //   par: props.par || "",
  //   score: props.score || "",
  //   website: props.website || "",
  // };

  // const [inputs, setInputs] = useState(initInputs);

  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setInputs((prevInputs) => ({
  //     ...prevInputs,
  //     [name]: value,
  //   }));
  // }

  return (
    <div className="course-form-container">
      <form onSubmit={submit} className="course-form">
        <input
          type="text"
          name="courseName"
          value={inputs.courseName}
          onChange={handleChange}
          placeholder="Course Name"
        />
        <input
          type="text"
          name="state"
          value={inputs.state}
          onChange={handleChange}
          placeholder="State"
        />
        <input
          type="text"
          name="city"
          value={inputs.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="number"
          name="par"
          value={inputs.par}
          onChange={handleChange}
          placeholder="Par"
        />
        <input
          type="number"
          name="score"
          value={inputs.score}
          onChange={handleChange}
          placeholder="Score"
        />
        <input
          type="text"
          name="website"
          value={inputs.website}
          onChange={handleChange}
          placeholder="Website"
        />
        <button id="add-course-btn">{btnText}</button>
      </form>
    </div>
  );
}

export default CourseForm;