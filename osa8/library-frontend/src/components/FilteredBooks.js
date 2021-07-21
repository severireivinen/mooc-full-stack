import React from 'react'

const FilteredBooks = ({ books, genres, setFilter, setGenre }) => {
    return (
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
    )
}

export default FilteredBooks