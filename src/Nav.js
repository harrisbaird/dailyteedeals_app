/* @flow */

import { StackNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'

import { COLOUR_BG } from './constants'

const Nav = StackNavigator({
  Home: { screen: HomeScreen },
  Detail: { screen: DetailScreen }
}, {
  cardStyle: { backgroundColor: COLOUR_BG},
})

export default Nav
