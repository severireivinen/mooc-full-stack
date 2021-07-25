import { useSubscription, useApolloClient } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import Recommendations from './components/Recommendations'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.watchQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const style = {
    'display': 'flex',
    'flexDirection': 'row'
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div style={style}>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token
          ?
          <div>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </div>
          :
          <button onClick={() => setPage('login')}>login</button>
        }

      </div>

      <Authors
        show={page === 'authors'}
        setError={notify}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
      />

      <Recommendations
        show={page === 'recommend'}
      />

    </div>
  )
}

export default App