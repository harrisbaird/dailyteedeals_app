/* @flow */

import React from 'react'
import {View, StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigator} from 'react-navigation'
import SettingsList from 'react-native-settings-list'
import Icon from '../components/Icon'
import TabIcon from '../components/TabIcon'
import * as actions from '../actions/settings'
import CURRENCIES from '../config/currencies'
import Theme from '../config/theme'

type Props = {
  navigation: StackNavigator,
  currency: string,
  itemsPerRow: number,
  gridImagesOnly: boolean,
  setCurrency: Function,
  setItemsPerRow: Function,
  setGridImagesOnly: Function
};

class SettingsListScreen extends React.PureComponent<void, Props, void> {
  static navigationOptions = {
    title: 'Settings',
    tabBar: {
      icon: ({tintColor}) => <TabIcon name="cog" tintColor={tintColor} />
    }
  };

  render() {
    let {navigate} = this.props.navigation
    let {
      currency,
      itemsPerRow,
      gridImagesOnly,
      hiddenSites,
      setCurrency,
      setItemsPerRow,
      setGridImagesOnly
    } = this.props

    return (
      <SettingsList
        borderColor={Theme.colourSettingsBorder()}
        style={styles.container}
      >
        <SettingsList.Item
          title="Currency"
          titleInfo={CURRENCIES[currency].name}
          icon={this._makeIcon(CURRENCIES[currency].icon)}
          hasNavArrow={Platform.OS === 'ios'}
          onPress={() =>
            navigate('SettingsDetail', {
              title: 'Currency',
              type: 'currency',
              values: Object.keys(CURRENCIES),
              updateFn: setCurrency,
              generateTitleFn: c => CURRENCIES[c].name
            })}
        />
        <SettingsList.Item
          title="Items Per Row"
          titleInfo={itemsPerRow.toString()}
          icon={this._makeIcon('grid')}
          hasNavArrow={Platform.OS === 'ios'}
          onPress={() =>
            navigate('SettingsDetail', {
              title: 'Items Per Row',
              type: 'itemsPerRow',
              values: [2, 3, 4, 5, 6],
              updateFn: setItemsPerRow,
              generateTitleFn: c => c.toString() + ' items per row'
            })}
        />
        <SettingsList.Item
          title="Hidden Sites"
          titleInfo={hiddenSites.length.toString()}
          icon={this._makeIcon('block')}
          hasNavArrow={Platform.OS === 'ios'}
          onPress={() => navigate('SettingsHiddenSites')}
        />
        <SettingsList.Item
          hasNavArrow={false}
          switchState={gridImagesOnly}
          icon={this._makeIcon('picture')}
          switchOnValueChange={setGridImagesOnly}
          hasSwitch={true}
          title="Display images only"
        />
      </SettingsList>
    )
  }

  _makeIcon(icon) {
    return (
      <View style={styles.iconContainer}>
        <Icon name={icon} style={styles.icon} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  iconContainer: {
    marginLeft: 15,
    height: 30,
    width: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Theme.colourAccent
  },
  icon: {
    fontSize: 20,
    backgroundColor: Theme.colourTransparent,
    color: Theme.colourWhite
  }
})

const mapStateToProps = state => ({
  currency: state.settings.currency,
  itemsPerRow: state.settings.itemsPerRow,
  hiddenSites: state.settings.hiddenSites,
  gridImagesOnly: state.settings.gridImagesOnly
})

const mapDispatchToProps = dispatch => ({
  setCurrency: v => dispatch(actions.setCurrency(v)),
  setItemsPerRow: v => dispatch(actions.setItemsPerRow(v)),
  setGridImagesOnly: v => dispatch(actions.setGridImagesOnly(v))
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsListScreen)
