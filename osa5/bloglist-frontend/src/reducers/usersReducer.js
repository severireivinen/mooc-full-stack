import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const usersReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data.user
  case 'LOGOUT':
    return null
  default: return state
  }
}

export const login = credentials => {
  return async dispatch => {

    try {
      const user = await loginService.login(credentials)

      dispatch({
        type: 'LOGIN',
        data: { user }
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setNotification(`Welcome ${user.name}`,3))
    } catch (error) {
      dispatch(setNotification('Invalid credentials', 3))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const tokenLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: { user }
      })
    }
  }
}

export default usersReducer