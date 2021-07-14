import React, { useState } from 'react'
//import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/usersReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    const credentials = { username, password }
    dispatch(login(credentials))
    setUsername('')
    setPassword('')

  }

  return (
    <div>
      <h2>log in to application</h2>

      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
          <Button variant='primary' type='submit' id='login-button'>login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

/*LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}*/

export default LoginForm