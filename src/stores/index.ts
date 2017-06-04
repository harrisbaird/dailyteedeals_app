import {compose, createStore, applyMiddleware} from 'redux'
import {autoRehydrate} from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const store = createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(thunkMiddleware), autoRehydrate())
)

export default store
