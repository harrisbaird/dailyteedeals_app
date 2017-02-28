/* @flow */

/**
 * StatusBarPaddingIOS pads the statusbar so that content doesn't appear
 * underneath it. This only applies to iOS.
 */

import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import StatusBarSizeIOS from 'react-native-status-bar-size'

type Props = {
  children?: React.Element<*>;
}

type State = {
  currentStatusBarHeight: number
}

export default class StatusBarPadding extends React.PureComponent<void, Props, State> {
  state: State = {
    currentStatusBarHeight: StatusBarSizeIOS.currentHeight
  }

  componentDidMount() {
    if (Platform.OS !== 'ios') return
    StatusBarSizeIOS.addEventListener('didChange', this._handleStatusBarSizeDidChange);
  }

  componentWillUnmount() {
    if (Platform.OS !== 'ios') return
    StatusBarSizeIOS.removeEventListener('didChange', this._handleStatusBarSizeDidChange);
  }

  _handleStatusBarSizeDidChange(currentStatusBarHeight) {
    this.setState({ currentStatusBarHeight: currentStatusBarHeight });
  }

  render() {
    let height = Platform.OS === 'ios' ? this.state.currentStatusBarHeight : 0

    return (
      <View style={styles.container}>
        <View style={{height: height}} />
        { this.props.children }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
