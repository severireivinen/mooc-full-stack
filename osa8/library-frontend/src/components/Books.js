import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import FilteredBooks from './FilteredBooks'

const Books = ({ show }) => {
  const books = useQuery(ALL_BOOKS)
  const genres = useQuery(ALL_GENRES)

  const [getFilteredBooks, result] = useLazyQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)

  const setFilter = (g) => {
    getFilteredBooks({ variables: { genre: g } })
  }

  useEffect(() => {
    if (result.data) {
      setGenre(result.data.allBooks)
    }
  }, [result])

  if (!show) {
    return null
  }

  if (books.loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      {genre ?
        <FilteredBooks
          books={result}
          genres={genres}
          setFilter={setFilter}
          setGenre={setGenre}
        />
        :
        <div>
          <h2>books</h2>

          <table>
            <tbody>
              <tr>
                <th></th>
                <th>
                  author
                </th>
                <th>
                  published
                </th>
              </tr>
              {books.data.allBooks.map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div>
            {genres.data.allGenres.map(g =>
              <button key={g} onClick={() => setFilter(g)}>{g}</button>
            )}
            <button onClick={() => setGenre(null)}>all genres</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Books