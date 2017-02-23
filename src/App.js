/* @flow */

import React from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { COLOUR_HEADER_BG } from './config/constants'
import store from './stores'
import Nav from './Nav'

const App = () => (
  <View style={styles.container}>
    <StatusBar backgroundColor={COLOUR_HEADER_BG} barStyle='light-content' />
    <Provider store={store}>
      <Nav />
    </Provider>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App
