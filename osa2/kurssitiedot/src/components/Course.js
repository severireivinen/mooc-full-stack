import React from 'react'

const Header = ({ name }) => (
    <h1>{name}</h1>
)

const Content = ({ parts }) => (
    <ul>
        {parts.map((part) =>
            <Part key={part.id} part={part} />
        )}
    </ul>
)


const Part = ({ part }) => (
    <li>
        <p>{part.name} {part.exercises}</p>
    </li>
)

const Total = ({ parts }) => {
    const totalExercises = parts.reduce((acc, obj) => acc + obj.exercises, 0)
    return (
        <strong>Number of total exercises: {totalExercises}</strong>
    )
}

const Course = ({ course }) => (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
    </div>
)


export default Course