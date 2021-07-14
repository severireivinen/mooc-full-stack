import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  users: usersReducer
})

const storeEnhancer = applyMiddleware(thunk)

const store = createStore(
  reducer,
  storeEnhancer
)

export default store