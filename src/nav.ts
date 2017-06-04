import {Platform} from 'react-native'
import {StackNavigator, TabNavigator} from 'react-navigation'
import DealsScreen from './screens/DealsScreen'
import CategoriesScreen from './screens/CategoriesScreen'
import CategoryDesignsScreen from './screens/CategoryDesignsScreen'
import FavoritesScreen from './screens/FavoritesScreen'
import DesignScreen from './screens/DesignScreen'
import SettingsScreen from './screens/SettingsScreen'
import SettingsDetailScreen from './screens/SettingsDetailScreen'
import * as Theme from './config/theme'

const navigationOptions = {
  headerStyle: {backgroundColor: Theme.HEADER_BG, elevation: 0},
  headerTintColor: Theme.HEADER_TINT
}

const defaultStyle = {
  cardStyle: {backgroundColor: Theme.SCREEN_BG},
  navigationOptions: navigationOptions
}

const tabBarOptions = {
  showLabel: Platform.OS === 'ios' ? true : false,
  showIcon: true,
  activeTintColor: Theme.TAB_BAR_ACTIVE_TINT,
  inactiveTintColor: Theme.TAB_BAR_INACTIVE_TINT,
  pressColor: Theme.TAB_BAR_ACTIVE_TINT,
  indicatorStyle: {
    backgroundColor: Theme.ACCENT
  },
  style: {
    backgroundColor: Theme.TAB_BAR_BG
  }
}

const homeTabs = TabNavigator(
  {
    Deals: {screen: DealsScreen},
    Categories: {screen: CategoriesScreen},
    Favorites: {screen: FavoritesScreen},
    Settings: {screen: SettingsScreen}
  },
  {
    ...defaultStyle,
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: tabBarOptions
  }
)

const main = StackNavigator(
  {
    HomeTabs: {screen: homeTabs},
    Design: {screen: DesignScreen},
    SettingsDetail: {screen: SettingsDetailScreen},
    CategoryDesigns: {screen: CategoryDesignsScreen}
  },
  {
    ...defaultStyle,
    cardStyle: {backgroundColor: Theme.SCREEN_BG}
  }
)

export default main
