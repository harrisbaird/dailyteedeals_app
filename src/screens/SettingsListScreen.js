/* @flow */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import SettingsList from 'react-native-settings-list'
import * as actions from '../actions'
import { CURRENCIES } from '../constants'

type Props = {
  navigation: StackNavigator,
  currency: string,
  itemsPerRow: number,
  setCurrency: Function,
  setItemsPerRow: Function,
}

class SettingsListScreen extends React.Component {
  render() {
    let { navigation, currency, itemsPerRow, setCurrency, setItemsPerRow } = this.props

    return (
      <View style={{flex:1}}>
        <SettingsList>
          <SettingsList.Item
            title='Currency'
            titleInfo={CURRENCIES[currency].name}
            onPress={() => navigation.navigate('SettingsDetail', {
              title: 'Currency',
              type: 'currency',
              values: Object.keys(CURRENCIES),
              updateFn: setCurrency,
              generateTitleFn: ((c) => CURRENCIES[c].name),
            })} />

          <SettingsList.Item
            title='Items Per Row'
            titleInfo={itemsPerRow.toString()}
            onPress={() => navigation.navigate('SettingsDetail', {
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
}

const mapStateToProps = (state) => ({
  currency: state.settings.currency,
  itemsPerRow: state.settings.itemsPerRow,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrency: (v) => {
    dispatch(actions.setCurrency(v))
  },
  setItemsPerRow: (v) => {
    dispatch(actions.setItemsPerRow(v))
  },
})

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(SettingsListScreen)
