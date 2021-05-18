import React, { useState } from 'react'

const Header = (props) => (
  <h1>{props.header}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const allReviews = good + neutral + bad
  if (allReviews <= 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={allReviews} />
        <StatisticLine text='average' value={((good * 1) + (neutral * 0) + (bad * -1)) / allReviews} />
        <StatisticLine text='positive' value={(good / allReviews) * 100} />
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>

      <Header header='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Header header='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App