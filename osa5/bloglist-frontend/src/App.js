import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { tokenLogin, logout } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { initializeUsers } from './reducers/allUsersReducer'


const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(tokenLogin())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setNotification('logged out', 3))
  }

  const match = useRouteMatch('/users/:id')
  const singleUser = match ? users.find(u => u.id === (match.params.id)) : null

  const Home = () => (
    <div>
      <Notification />

      {user === null ?
        <LoginForm /> :
        <div>
          <h1>Blog App</h1>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <BlogList blogs={blogs} user={user} />
        </div>
      }
    </div>
  )

  const Users = () => (
    <div>
      {user === null ?
        <LoginForm /> :
        <div>
          <h1>Blog App</h1>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <UserList users={users} />
        </div>
      }
    </div>
  )

  const User = ({ id }) => (
    <div>
      {user === null ?
        <LoginForm /> :
        <div>
          <h1>Blog App</h1>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <h3>added blogs</h3>
          <ul>
            {id.blogs.map(blog =>
              <li key={blog.id}>{blog.title}</li>
            )}
          </ul>
        </div>
      }
    </div>
  )




  return (
    <div className='container'>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle ara-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">users</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path='/users/:id'>
          <User id={singleUser} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>

    </div>
  )
}

export default App