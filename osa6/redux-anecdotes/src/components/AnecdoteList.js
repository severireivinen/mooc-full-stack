import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase())))
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const handleClick = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(`You voted ${anecdote.content}`, 5000))
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleClick(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList