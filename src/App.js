/* @flow */

import React from 'react'
import { View, StatusBar, StyleSheet, AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import Theme from './config/theme'
import store from './stores'
import Nav from './Nav'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount(){
    persistStore(store, {storage: AsyncStorage, whitelist: ['settings']}, () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {
    // This prevents the deals grid from updating multiple times during
    // while the settings store is rehydrating.
    if(!this.state.rehydrated){
      return null
    }

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Theme.colourBGAlt}
          transparent={true}
          barStyle='light-content' />
        <Provider store={store}>
          <Nav />
        </Provider>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
