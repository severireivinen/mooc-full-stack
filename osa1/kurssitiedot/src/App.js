import React from 'react'

const Header = (props) => {
  return (
    <h1>
      {props.data.course}
    </h1>
  )
}

const Content = (props) => {
  return (
    <ul>
      {props.data.parts.map((part) =>
        <Part key={part.id} part={part} />
      )}
    </ul>
  )
}

const Total = (props) => {
  const totalExercises = props.data.parts.reduce((acc, obj) => acc + obj.exercises, 0)
  return (
    <p>Number of total exercises: {totalExercises}</p>
  )
}

const Part = (props) => {
  return (
    <li>
      <p>{props.part.name} {props.part.exercises}</p>
    </li>
  )
}

const App = () => {
  const courseData = {
    course: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header data={courseData} />
      <Content data={courseData} />
      <Total data={courseData} />
    </div>
  )
}

export default App