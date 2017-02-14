/* @flow */

import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native'
import { connect } from 'react-redux'
import SettingsList from 'react-native-settings-list'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as actions from '../actions'
import { CURRENCIES, COLOUR_MISC } from '../constants'

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
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
          <SettingsList.Item
            title='Currency'
            titleInfo={CURRENCIES[currency].name}
            icon={this.makeIcon(CURRENCIES[currency].icon)}
            hasNavArrow={Platform.OS === 'ios'}
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
            icon={this.makeIcon('th')}
            hasNavArrow={Platform.OS === 'ios'}
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

  makeIcon(icon) {
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
