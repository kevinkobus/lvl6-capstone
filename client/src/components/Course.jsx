import React from 'react'

function Course(props){
  const { courseName, country, city, region, par, played, score, website, _id } = props
  return (
    <div className="course">
      <h1>{courseName}</h1>
      <h3>{country}</h3>
      <h3>{city}</h3>
      <h3>{region}</h3>
      <h3>{par}</h3>
      <h3>{played}</h3>
      <h3>{score}</h3>
      <h3>{website}</h3>
    </div>
  )
}

export default Course