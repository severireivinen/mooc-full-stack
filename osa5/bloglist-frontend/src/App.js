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
import SingleUserView from './components/SingleUserView'
import { Navbar, Nav } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(tokenLogin())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setNotification('logged out', 3))
  }

  const match = useRouteMatch('/users/:id')
  const singleUser = match ? blogs.find(blog => blog.user.id === Number(match.params.id)) : null

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
          <UserList blogs={blogs} />
        </div>
      }
    </div>
  )

  const User = () => (
    <div>
      {user === null ?
        <LoginForm /> :
        <div>
          <h1>Blog App</h1>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <SingleUserView singleUser={singleUser} />
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
          <User />
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