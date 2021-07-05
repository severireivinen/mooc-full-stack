import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer
})

const storeEnhancer = applyMiddleware(thunk)

const store = createStore(
  reducer,
  storeEnhancer
)

export default store