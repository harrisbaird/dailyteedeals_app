/* @flow */

import { StackNavigator, TabNavigator } from 'react-navigation'

import DealsScreen from './screens/DealsScreen'
import CategoriesScreen from './screens/CategoriesScreen'
import EventsScreen from './screens/EventsScreen'
import DealDetailScreen from './screens/DealDetailScreen'
import SettingsScreen from './screens/SettingsScreen'
import SettingsHiddenSitesScreen from './screens/SettingsHiddenSitesScreen'
import SettingsDetailScreen from './screens/SettingsDetailScreen'

import Theme from './config/theme'

const defaultStyles = {
  cardStyle: { backgroundColor: Theme.colourBG },
  headerMode: 'screen',
}

const visibleHeader = {
  navigationOptions: {
    header: {
      enabled: false,
      style: { backgroundColor : Theme.colourBGAlt },
      tintColor: Theme.colourWhite,
    }
  }
}

const Home = TabNavigator({
  Deals: { screen: DealsScreen },
  Categories: { screen: CategoriesScreen },
  Events: { screen: EventsScreen },
  Settings: { screen: SettingsScreen },
}, {
  swipeEnabled: true,
  animationEnabled: true,
  navigationOptions: {
    header: {
      visible: false
    }
  },
  tabBarOptions: {
    activeTintColor: Theme.colourAccent,
    inactiveTintColor: Theme.colourGrey75,
    pressColor: Theme.colourGrey25,
    indicatorStyle: {
      backgroundColor: Theme.colourTransparent,
    },
    style: {
      backgroundColor: Theme.colourBGAlt,
    }
  }
})

const Main = StackNavigator({
  Home: { screen: Home },
  DealDetail: { screen: DealDetailScreen, ...visibleHeader },
  SettingsHiddenSites: { screen: SettingsHiddenSitesScreen, ...visibleHeader },
  SettingsDetail: { screen: SettingsDetailScreen, ...visibleHeader },
}, defaultStyles)

export default Main
