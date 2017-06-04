import React from 'react'
import { View, StatusBar, StyleSheet, AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import * as Theme from './config/theme'
import store from './stores'
import Nav from './nav'

interface Props { }
interface State { rehydrated: boolean }

const styles: any = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default class App extends React.PureComponent<Props, State> {
  state: State = {
    rehydrated: false
  }

  componentWillMount() {
    persistStore(
      store,
      { storage: AsyncStorage, whitelist: ['settings'] },
      () => {
        this.setState({ rehydrated: true })
      }
    )
  }

  render() {
    // This prevents the deals grid from updating multiple times during
    // while the settings store is rehydrating.
    if (!this.state.rehydrated) {
      return null
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Theme.PRIMARY}
          barStyle="light-content"
          animated={true} />
        <Provider store={store}>
          <Nav />
        </Provider>
      </View>
    )
  }
}
