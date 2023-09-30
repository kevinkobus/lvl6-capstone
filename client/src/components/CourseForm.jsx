import React from "react";


function CourseForm(props) {

  const { inputs, submit, handleChange, btnText } = props

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