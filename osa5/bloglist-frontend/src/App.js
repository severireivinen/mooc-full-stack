import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newMessage, setNewMessage] = useState(null)

  const isError = newMessage === null ? null : newMessage.isError

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNewMessage(
        { display: `Welcome back ${user.name}`, isError: false }
      )
      setTimeout(() => {
        setNewMessage(null)
      }, 3000)
    } catch (exception) {
      setNewMessage(
        {display: 'Wrong username or password', isError: true}
      )
      setTimeout(() => {
        setNewMessage(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setNewMessage(
      { display: `Bye bye ${user.name}`, isError: false }
    )
    setTimeout(() => {
      setNewMessage(null)
      window.location.reload()
    }, 1500)
  }

  const handleNewBlog = (event) => {
    event.preventDefault()

    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewMessage(
          { display: `a new blog ${newTitle} by ${newAuthor} added`, isError: false }
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
      })
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  return (
    <div>
      <Notification message={newMessage} isError={isError} />
      {user === null && <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}
      {user !== null && <BlogList user={user} blogs={blogs} handleLogout={handleLogout} handleNewBlog={handleNewBlog} newTitle={newTitle}
        newAuthor={newAuthor} newUrl={newUrl} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} />}
    </div>
  )
}

export default App