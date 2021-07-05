import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogsReducer'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const loggingUser = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggingUser)
      )

      blogService.setToken(loggingUser.token)
      setUser(loggingUser)

      dispatch(setNotification(`Welcome back ${loggingUser.name}`, 3))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 3))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setNotification(`Bye bye ${user.name}`, 3))
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  }
  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${user.name} added`, 3))
    } catch (error) {
      dispatch(setNotification('please login again', 3))
    }
  }

  const removeBlog = blog => {
    dispatch(deleteBlog(blog))
    dispatch(setNotification(`removed ${blog.title}`, 3))
  }

  const updateLikes = blog => {
    dispatch(likeBlog(blog))
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
      <Notification />

      {user === null ?
        loginForm() :
        <div>
          <h1>Blog App</h1>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {blogForm()}

          {blogs.map(blog =>
            <Blog key={blog.id}
              user={user}
              blog={blog}
              handleLike={() => updateLikes(blog)}
              handleRemove={() => removeBlog(blog)}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App