/* @flow */

import React from 'react';
import { StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import SettingsList from 'react-native-settings-list'
import LinearGradient from 'react-native-linear-gradient'
import Icon from '../components/Icon'
import * as actions from '../actions/settings'
import CURRENCIES from '../config/currencies'
import { COLOUR_WHITE, COLOUR_TRANSPARENT, COLOUR_SETTINGS_BORDER, COLOUR_GRADIENT_START, COLOUR_GRADIENT_END } from '../config/theme'

type Props = {
  navigation: StackNavigator,
  currency: string,
  itemsPerRow: number,
  gridImagesOnly: boolean,
  setCurrency: Function,
  setItemsPerRow: Function,
  setGridImagesOnly: Function,
}

class SettingsListScreen extends React.Component<void, Props, void> {
  static navigationOptions = {
    title: 'Settings'
  }

  render() {
    let { navigate } = this.props.navigation
    let { currency, itemsPerRow, gridImagesOnly, hiddenSites, setCurrency, setItemsPerRow, setGridImagesOnly } = this.props

    return (
      <SettingsList borderColor={COLOUR_SETTINGS_BORDER} style={styles.container}>
        <SettingsList.Item
          title='Currency'
          titleInfo={CURRENCIES[currency].name}
          icon={this._makeIcon(CURRENCIES[currency].icon)}
          hasNavArrow={Platform.OS === 'ios'}
          onPress={() => navigate('SettingsDetail', {
            title: 'Currency',
            type: 'currency',
            values: Object.keys(CURRENCIES),
            updateFn: setCurrency,
            generateTitleFn: ((c) => CURRENCIES[c].name),
          })} />
        <SettingsList.Item
          title='Items Per Row'
          titleInfo={itemsPerRow.toString()}
          icon={this._makeIcon('grid')}
          hasNavArrow={Platform.OS === 'ios'}
          onPress={() => navigate('SettingsDetail', {
            title: 'Items Per Row',
            type: 'itemsPerRow',
            values: [2, 3, 4, 5, 6],
            updateFn: setItemsPerRow,
            generateTitleFn: ((c) => c.toString() + ' items per row'),
          })} />
        <SettingsList.Item
          title='Hidden Sites'
          titleInfo={hiddenSites.length.toString()}
          icon={this._makeIcon('block')}
          hasNavArrow={Platform.OS === 'ios'}
          onPress={() => navigate('SettingsHiddenSites')} />
        <SettingsList.Item
         hasNavArrow={false}
         switchState={gridImagesOnly}
         icon={this._makeIcon('picture')}
         switchOnValueChange={setGridImagesOnly}
         hasSwitch={true}
         title='Display images only' />
      </SettingsList>
    )
  }

  _makeIcon(icon) {
    return (
      <LinearGradient
        colors={[COLOUR_GRADIENT_START, COLOUR_GRADIENT_END]}
        start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
        style={styles.iconContainer}>
        <Icon name={icon} style={styles.icon} />
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  iconContainer: {
    marginLeft:15,
    height: 30,
    width: 30,
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  icon: {
    fontSize: 20,
    backgroundColor: COLOUR_TRANSPARENT,
    color: COLOUR_WHITE
  }
})

const mapStateToProps = (state) => ({
  currency: state.settings.currency,
  itemsPerRow: state.settings.itemsPerRow,
  hiddenSites: state.settings.hiddenSites,
  gridImagesOnly: state.settings.gridImagesOnly,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrency: (v) => dispatch(actions.setCurrency(v)),
  setItemsPerRow: (v) => dispatch(actions.setItemsPerRow(v)),
  setGridImagesOnly: (v) => dispatch(actions.setGridImagesOnly(v)),
})

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(SettingsListScreen)
