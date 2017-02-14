/* @flow */

import React from 'react'
import { Provider } from 'react-redux'
import store from './stores'
import Nav from './Nav'

const App = () => (
  <Provider store={store}>
    <Nav />
  </Provider>
)

export default App
