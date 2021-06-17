import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [newMessage, setNewMessage] = useState(null)

  const isError = newMessage === null ? null : newMessage.isError
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs(initialBlogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

      setNewMessage(
        { display: `Welcome back ${user.name}`, isError: false }
      )
      setTimeout(() => {
        setNewMessage(null)
      }, 3000)
    } catch (exception) {
      setNewMessage(
        { display: 'Wrong username or password', isError: true }
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

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewMessage(
          { display: `a new blog ${returnedBlog.title} by ${user.name} added`, isError: false }
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
      })
      .catch(() => {
        setNewMessage(
          { display: 'please login again', isError: true }
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 3000)
      })
  }

  const updateLikes = id => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
      })
      .catch(() => {
        setNewMessage(
          { display: 'blog was already deleted from the server', isError: true }
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 3000)
      })
  }

  const removeBlog = id => {
    const blog = blogs.find(b => b.id === id)

    blogService
      .remove(id, blog)
      .then(() => {
        setBlogs(blogs.filter(b => b.id !== id))
        setNewMessage(
          { display: 'blog deleted successfully', isError: false }
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 3000)
      })
      .catch(() => {
        setNewMessage(
          { display: 'error deleting the blog', isError: true }
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 3000)
      })
  }

  const loginForm = () => (
    <LoginForm login={handleLogin} />
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <Notification message={newMessage} isError={isError} />

      {user === null ?
        loginForm() :
        <div>
          <h1>Blog App</h1>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {blogForm()}

          {blogs.map(blog =>
            <Blog key={blog.id}
              blog={blog}
              user={user}
              handleLike={() => updateLikes(blog.id)}
              handleRemove={() => removeBlog(blog.id)}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App