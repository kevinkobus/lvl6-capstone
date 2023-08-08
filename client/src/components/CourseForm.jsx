import React, { useState } from "react";

const initInputs = {
  courseName: "",
  country: "",
  city: "",
  region: "",
  par: 0,
  played: "",
  score: 0,
  website: "",
};

function CourseForm(props) {
  const [inputs, setInputs] = useState(initInputs);
  const { addGolfCourse } = props;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addGolfCourse(inputs);
    setInputs(initInputs);
  }

  const { courseName, country, city, region, par, played, score, website } =
    inputs;
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="courseName"
        value={courseName}
        onChange={handleChange}
        placeholder="Course Name"
      />
      <input
        type="text"
        name="country"
        value={country}
        onChange={handleChange}
        placeholder="Country"
      />
      <input
        type="text"
        name="city"
        value={city}
        onChange={handleChange}
        placeholder="City"
      />
      <input
        type="text"
        name="region"
        value={region}
        onChange={handleChange}
        placeholder="State/Province/County"
      />
      <label>
        Par
        <input type="number" name="par" value={par} onChange={handleChange} />
      </label>
      <label>
        Played
        <input
          type="checkbox"
          name="played"
          value={played}
          onChange={handleChange}
        />
      </label>
      <label>
        Best Score
        <input
          type="number"
          name="score"
          value={score}
          onChange={handleChange}
        />
      </label>
      <input
        type="text"
        name="website"
        value={website}
        onChange={handleChange}
        placeholder="Website"
      />
      <button>Add Course</button>
    </form>
  );
}

export default CourseForm;
