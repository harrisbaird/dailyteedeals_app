import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-navigation'
import SettingsList from 'react-native-settings-list'
import { fetchSites } from '../actions'
import Icon from '../components/Icon'
import * as Theme from '../config/theme'

interface Props {
  navigation: Navigation,
  switchStateProp: string
}
interface State { }

class SettingsDetailScreen extends React.PureComponent<Props, State> {
  render() {
    let {
      type,
      values,
      titleFn,
      valueFn,
      updateFn,
      hasSwitch
    } = this.props.navigation.state.params

    let currentValue = this.props[type]

    return (
      <View style={styles.container}>
        <SettingsList borderColor={Theme.SPACER} backgroundColor={Theme.PRIMARY}>
          {values.map(obj => {
            let value = valueFn(obj)
            return (
              <SettingsList.Item
                title={titleFn(obj)}
                titleStyle={styles.itemTitle}
                key={value}
                onPress={() => updateFn(value)}
                hasSwitch={hasSwitch}
                switchState={this._getSwitchState(value)}
                switchOnValueChange={() => updateFn(value)}
                hasNavArrow={!hasSwitch && value === currentValue}
                arrowIcon={
                  <View style={styles.iconContainer}>
                    <Icon name="check" style={styles.icon} />
                  </View>
                }
              />
            )
          })}
        </SettingsList>
      </View>
    )
  }

  _getSwitchState(value) {
    let { switchStateProp } = this.props
    let stateProp = this.props[switchStateProp]
    return switchStateProp && stateProp.includes(value)
  }
}

const styles: any = StyleSheet.create({
  container: {
    flex: 1
  },
  itemTitle: {
    color: '#fff'
  },
  itemTitleInfo: {
    color: Theme.SPACER
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15
  },
  icon: {
    fontSize: 20,
    color: Theme.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = state => ({
  currency: state.settings.currency,
  defaultOrder: state.settings.defaultOrder,
  hiddenSites: state.settings.hiddenSites
})

const mapDispatchToProps = dispatch => ({
  fetchSites: () => dispatch(fetchSites())
})

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(
  SettingsDetailScreen
)
