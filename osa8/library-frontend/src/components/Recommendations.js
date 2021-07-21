import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = ({ show }) => {
    const me = useQuery(ME)
    const [getRecommended, result] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        if (me.data && me.data.me !== null) {
            getRecommended({ variables: { genre: me.data.me.favoriteGenre } })
        }
    }, [me]) //eslint-disable-line

    if (!show) {
        return null
    }

    if (me.loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <strong>{me.data.me.favoriteGenre}</strong></p>
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
                    {result.data.allBooks.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations