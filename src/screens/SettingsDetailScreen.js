/* @flow */

import React from 'react';
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import SettingsList from 'react-native-settings-list'
import Icon from '../components/Icon'
import { COLOUR_ACCENT, COLOUR_SETTINGS_BORDER } from '../config/theme'

type Props = {
  navigation: StackNavigator,
  currency: string,
  itemsPerRow: number,
  setCurrency: Function,
  setItemsPerRow: Function,
}

class SettingsDetailScreen extends React.Component<void, Props, void> {
  static navigationOptions = {
    title: ({ state }) => `${state.params.title}`,
  }

  render() {
    let { type, values, generateTitleFn, updateFn } = this.props.navigation.state.params

    let currentValue = this.props[type]

    return (
      <View style={styles.container}>
        <SettingsList borderColor={COLOUR_SETTINGS_BORDER}>
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
  container: {
    flex: 1
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  icon: {
    fontSize: 20,
    color: COLOUR_ACCENT,
    alignItems:'center',
    justifyContent:'center'
  }
})

const mapStateToProps = (state) => ({
  currency: state.settings.currency,
  itemsPerRow: state.settings.itemsPerRow,
})

export default connect(mapStateToProps)(SettingsDetailScreen)
