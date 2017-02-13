/* @flow */

import { StackNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'

import { COLOUR_BG, COLOUR_HEADER_BG, COLOUR_HEADER_TEXT } from './constants'

const Nav = StackNavigator({
  Home: { screen: HomeScreen },
  Detail: { screen: DetailScreen },
}, {
  cardStyle: { backgroundColor: COLOUR_BG},
  navigationOptions: {
    header: {
      style: { backgroundColor : COLOUR_HEADER_BG },
      tintColor: COLOUR_HEADER_TEXT,
    },
  },
});

export default Nav
