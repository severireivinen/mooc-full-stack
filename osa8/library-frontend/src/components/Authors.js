import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ show, setError, token }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authors = useQuery(ALL_AUTHORS)

  const [changeBirthYear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    changeBirthYear({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('author not found')
    }
  }, [authors.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  if (authors.loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {token ?
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <div>
              <select
                value={name}
                onChange={({ target }) => setName(target.value)}
              >
                {authors.data.allAuthors.map(a =>
                  <option key={a.name} value={a.name}>{a.name}</option>
                )}

              </select>
            </div>
            <div>
              born <input
                value={born}
                onChange={({ target }) => setBorn(Number(target.value))}
              />
            </div>
            <button type='submit'>update author</button>
          </form>
        </div> :
        <div></div>
      }

    </div>
  )
}

export default Authors