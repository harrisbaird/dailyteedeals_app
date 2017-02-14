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

class SettingsDetailScreen extends React.Component<void, Props, void> {
  render() {
    let { type, values, generateTitleFn, updateFn } = this.props.navigation.state.params

    let currentValue = this.props[type]

    return (
      <View style={{flex:1}}>
        <SettingsList>
          {values.map((c, index) =>
            <SettingsList.Item
              title={generateTitleFn(c)}
              key={index}
              hasNavArrow={false}
              onPress={() => updateFn(c)}
              titleStyle={ currentValue == c ?  { color: '#f00'} : { color: '#000' } } />
          )}
        </SettingsList>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.settings.currency,
  itemsPerRow: state.settings.itemsPerRow,
})

export default connect(mapStateToProps)(SettingsDetailScreen)
