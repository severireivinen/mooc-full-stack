import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})


const storeEnhancer = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(
    reducer,
    storeEnhancer
)

export default store