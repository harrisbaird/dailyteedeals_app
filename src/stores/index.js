/* @flow */

import { AsyncStorage } from 'react-native'
import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const store = createStore(
  rootReducer,
  undefined,
  compose(
    applyMiddleware(thunkMiddleware),
    autoRehydrate()
  )
)

persistStore(store, {storage: AsyncStorage, whitelist: ['settings']})

export default store
