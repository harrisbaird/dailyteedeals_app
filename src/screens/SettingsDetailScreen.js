/* @flow */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import SettingsList from 'react-native-settings-list'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as actions from '../actions'
import { CURRENCIES, COLOUR_MISC } from '../constants'

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
        <SettingsList borderColor='#c8c7cc'>
          {values.map((c, index) =>
            <SettingsList.Item
              title={generateTitleFn(c)}
              key={index}
              hasNavArrow={c == currentValue}
              arrowIcon={<View style={styles.iconContainer}><Icon name='check' style={styles.icon} /></View>}
              onPress={() => updateFn(c)} />
          )}
        </SettingsList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  icon: {
    fontSize: 20,
    color: COLOUR_MISC,
    alignItems:'center',
    justifyContent:'center'
  }
})

const mapStateToProps = (state) => ({
  currency: state.settings.currency,
  itemsPerRow: state.settings.itemsPerRow,
})

export default connect(mapStateToProps)(SettingsDetailScreen)
