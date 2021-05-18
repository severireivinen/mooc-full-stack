import React, { useState } from 'react'

const random = (anecdotes) => (
  Math.floor(Math.random() * anecdotes.length)
)
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Display = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [top, setTop] = useState(selected)

  const handleVote = () => {
    console.log(votes)
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)

    if (copy[selected] > copy[top]) {
      setTop(selected)
    }
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Display anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={() => { setSelected(random(anecdotes)) }} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <Display anecdote={anecdotes[top]} votes={votes[top]} />
    </div>
  )
}

export default App