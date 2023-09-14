import React, { useState, useContext } from "react";
import { CourseContext } from "../context/CourseContext";

function CourseForm(props) {

  const { addUserCourse } = useContext(CourseContext)

  const initInputs = {
    title: props.title || "",
    description: props.description || "",
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

  const { title, description } = inputs;
  return (
    <form onSubmit={handleSubmit} className="course-form">
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="Description"
      />
      <button id="add-issue-btn">{props.btnText}</button>
    </form>
  );
}

export default CourseForm;