import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Navigation } from 'react-navigation'
import { connect } from 'react-redux'
import SettingsList from 'react-native-settings-list'
import CURRENCIES from '../config/currencies'
import Icon from '../components/Icon'
import ORDER_TYPES from '../config/order_types'
import * as Theme from '../config/theme'
import { fetchSites } from '../actions'
import * as actions from '../actions'

const styles: any = StyleSheet.create({
  container:  {
    flex:  1
  },
  iconContainer: {
    marginLeft:  15,
    height: 30,
    width: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Theme.ACCENT
  },
  icon: {
    fontSize:  20,
    backgroundColor: Theme.TRANSPARENT,
    color: Theme.WHITE
  }
})

interface Props {
  navigation: Navigation,
  sites: Array<any>,
  currency: string,
  hiddenSites: Array<number>,
  defaultOrder: string,
  fetchSites: Function,
  setCurrency: Function,
  setDefaultOrder: Function,
  toggleSiteHidden: Function
}
interface State {}

class SettingsScreen extends React.PureComponent<Props, State> {
  static navigationOptions = {
    title: 'Settings',
    tabBarIcon: ({tintColor}) => (
      <Icon name="settings" color={tintColor} size={24} />
    )
  }

  componentDidMount() {
    this.props.fetchSites()
  }

  render() {
    let {
      sites,
      currency,
      hiddenSites,
      defaultOrder,
      setCurrency,
      setDefaultOrder,
      toggleSiteHidden
    } = this.props

    return (
      <View>
        <SettingsList borderColor={Theme.WHITE} style={styles.container}>
          {this.generateSettingsItem(
            'Currency',
            CURRENCIES[currency].name,
            CURRENCIES[currency].icon,
            {
              type: 'currency',
              values: Object.keys(CURRENCIES),
              updateFn: setCurrency,
              valueFn: (obj: any) : any => obj,
              titleFn: (obj: any) : string => CURRENCIES[obj].name
            }
          )}

          {this.generateSettingsItem(
            'Hidden Sites',
            hiddenSites.length.toString(),
            'block',
            {
              values: sites,
              hasSwitch: true,
              switchStateProp: 'hiddenSites',
              titleFn: (obj: any) : string => obj.name,
              valueFn: (obj: any) : number => obj.id,
              updateFn: (id: number) : undefined => toggleSiteHidden(id)
            }
          )}

          {this.generateSettingsItem(
            'Default Sort',
            ORDER_TYPES[defaultOrder].name,
            'sort',
            {
              type: 'defaultOrder',
              values: Object.keys(ORDER_TYPES),
              updateFn: setDefaultOrder,
              valueFn: obj => obj,
              titleFn: c => ORDER_TYPES[c].name
            }
          )}
        </SettingsList>
      </View>
    )
  }

  generateSettingsItem(title: string, subtitle: string, icon: string, passProps: any) {
    return (
      <SettingsList.Item
        title={title}
        titleInfo={String(subtitle)}
        icon={this._makeIcon(icon)}
        hasNavArrow={Platform.OS === 'ios'}
        onPress={() =>
          this.props.navigation.navigate('SettingsDetail', passProps)}
      />
    )
  }

  _makeIcon(icon: string) {
    return (
      <View style={styles.iconContainer}>
        <Icon name={icon} style={styles.icon} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  sites: state.sites.sites,
  currency: state.settings.currency,
  defaultOrder: state.settings.defaultOrder,
  hiddenSites: state.settings.hiddenSites
})

const mapDispatchToProps = (dispatch: Function) => ({
  fetchSites: () => dispatch(fetchSites()),
  toggleSiteHidden: (siteID: number) =>
    dispatch(actions.toggleSiteHidden(siteID)),
  setCurrency: (value: string) => dispatch(actions.setCurrency(value)),
  setDefaultOrder: (value: string) => dispatch(actions.setDefaultOrder(value))
})

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(SettingsScreen)
