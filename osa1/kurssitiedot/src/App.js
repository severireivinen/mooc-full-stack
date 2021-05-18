import React from 'react'

const Header = (props) => {
  return (
    <h1>
      {props.course.name}
    </h1>
  )
}

const Content = (props) => {
  return (
    <ul>
      {props.parts.map((part) =>
        <Part key={part.id} part={part} />
      )}
    </ul>
  )
}

const Total = (props) => {
  const totalExercises = props.parts.reduce((acc, obj) => acc + obj.exercises, 0)
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
  const course = {
    name: 'Half Stack application development',
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
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App