/* @flow */

import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import SettingsList from 'react-native-settings-list'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as actions from '../actions'
import { CURRENCIES, COLOUR_MISC } from '../constants'

type Props = {
  navigation: StackNavigator,
  currency: string,
  itemsPerRow: number,
  gridImagesOnly: boolean,
  setCurrency: Function,
  setItemsPerRow: Function,
  setGridImagesOnly: Function,
}

class SettingsListScreen extends React.Component {
  render() {
    let { navigate } = this.props.navigation
    let { currency, itemsPerRow, gridImagesOnly, hiddenSites, setCurrency, setItemsPerRow, setGridImagesOnly } = this.props

    return (
      <View style={{flex:1}}>
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
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
            icon={this._makeIcon('th')}
            hasNavArrow={Platform.OS === 'ios'}
            onPress={() => navigate('SettingsDetail', {
              title: 'Items Per Row',
              type: 'itemsPerRow',
              values: [2, 3, 4, 5, 6],
              updateFn: setItemsPerRow,
              generateTitleFn: ((c) => c.toString()),
            })} />
        </SettingsList>
      </View>
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
  iconContainer: {
    marginLeft:15,
    height: 30,
    width: 30,
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    ...Platform.select({
      ios: {
        backgroundColor: COLOUR_MISC,
      },
      android: {
        backgroundColor: 'transparent',
      },
    })
  },
  icon: {
    fontSize: 20,
    ...Platform.select({
      ios: {
        color: '#fff',
      },
      android: {
        color: COLOUR_MISC,
      },
    })
  }
})

const mapStateToProps = (state) => ({
  currency: state.settings.currency,
  itemsPerRow: state.settings.itemsPerRow,
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
