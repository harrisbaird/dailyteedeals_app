/* @flow */

import { StackNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Detail: { screen: DetailScreen }
})

export default App
