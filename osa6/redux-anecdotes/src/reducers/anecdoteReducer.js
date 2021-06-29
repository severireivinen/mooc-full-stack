import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data

    case 'VOTE_ANECDOTE':
      const changedAnecdote = action.data.newContent
      return state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote)

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    default: return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdoteToChange = await anecdoteService.getById(id)
    const updatedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
    await anecdoteService.update(updatedAnecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: { newContent: updatedAnecdote }
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export default reducer