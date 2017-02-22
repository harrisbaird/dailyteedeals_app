/* @flow */

import { StackNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'
import SettingsListScreen from './screens/SettingsListScreen'
import SettingsHiddenSitesScreen from './screens/SettingsHiddenSitesScreen'
import SettingsDetailScreen from './screens/SettingsDetailScreen'

import { COLOUR_BG, COLOUR_HEADER_BG, COLOUR_HEADER_TEXT } from './config/constants'

const defaultStyles = {
  cardStyle: { backgroundColor: COLOUR_BG },
  navigationOptions: {
    header: {
      style: { backgroundColor : COLOUR_HEADER_BG },
      tintColor: COLOUR_HEADER_TEXT,
    }
  }
}

const Nav = StackNavigator({
  Home: { screen: HomeScreen },
  Detail: { screen: DetailScreen },
  SettingsList: { screen: SettingsListScreen },
  SettingsHiddenSites: { screen: SettingsHiddenSitesScreen },
  SettingsDetail: { screen: SettingsDetailScreen },
}, defaultStyles);

export default Nav
