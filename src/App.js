/* @flow */

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './stores'
import Nav from './Nav'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <Nav />
  </Provider>
)

export default App
