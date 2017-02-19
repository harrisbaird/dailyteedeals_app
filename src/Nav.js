/* @flow */

import React from 'react'
import { Button } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'
import SettingsListScreen from './screens/SettingsListScreen'
import SettingsHiddenSitesScreen from './screens/SettingsHiddenSitesScreen'
import SettingsDetailScreen from './screens/SettingsDetailScreen'

import { COLOUR_BG, COLOUR_HEADER_BG, COLOUR_HEADER_TEXT } from './constants'

const headerOptions = {
  style: { backgroundColor : COLOUR_HEADER_BG },
  tintColor: COLOUR_HEADER_TEXT,
}

const Nav = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Daily Tee Deals',
      header: ({ navigate }) => (
        Object.assign({}, headerOptions, {
          right: <Icon.Button
            name="cog"
            title="ADD"
            backgroundColor='transparent'
            onPress={() => navigate('SettingsList')} />
        })
      ),
    },
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: {
      title: ({ state }) => `${state.params.title}`,
    },
  },
  SettingsList: {
    screen: SettingsListScreen,
    navigationOptions: {
      title: 'Settings'
    },
  },
  SettingsHiddenSites: {
    screen: SettingsHiddenSitesScreen,
    navigationOptions: {
      title: 'Hidden Sites',
    },
  },
  SettingsDetail: {
    screen: SettingsDetailScreen,
    navigationOptions: {
      title: ({ state }) => `${state.params.title}`,
    },
  },
}, {
  cardStyle: { backgroundColor: COLOUR_BG},
  navigationOptions: {
    header: headerOptions
  },
});

export default Nav
