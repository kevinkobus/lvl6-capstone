import React from "react";
import PropTypes from "prop-types"

CourseForm.prototypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element.isRequired
  ]),
  type: PropTypes.string.isRequired,
}

function CourseForm(props) {
// console.log("Render CourseForm")

  const { inputs, submit, handleChange, btnText, children, type} = props

  return (
    <div className={`course-form-container ${type}`}>
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
          placeholder="Best Score"
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
      {children}
    </div>
  );
}

export default CourseForm;