import React, { useState } from "react";

const initInputs = {
  title: "",
  description: "",
};

function CourseForm(props) {
  const [inputs, setInputs] = useState(initInputs);
  const { addGolfCourse } = props

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addGolfCourse(inputs)
    setInputs(initInputs)
  }

  const { courseName, country, city, region, par, played, score, website } = inputs;
  return (
    <form onSubmit={handleSubmit}>
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
      <button>Add Course</button>
    </form>
  );
}

export default CourseForm;