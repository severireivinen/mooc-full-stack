import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'
import allUsersReducer from './reducers/allUsersReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: usersReducer,
  users: allUsersReducer
})

const storeEnhancer = applyMiddleware(thunk)

const store = createStore(
  reducer,
  storeEnhancer
)

export default store