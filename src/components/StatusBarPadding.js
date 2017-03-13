/* @flow */

/**
 * StatusBarPaddingIOS pads the statusbar so that content doesn't appear
 * underneath it. This only applies to iOS.
 */

import React from 'react'
import { View, Platform } from 'react-native'
import StatusBarSizeIOS from 'react-native-status-bar-size'

type Props = {
  style: Object,
}

type DefaultProps = {
  style: Object,
}

type State = {
  currentStatusBarHeight: number,
}

export default class StatusBarPadding extends React.Component<DefaultProps, Props, State> {
  defaultProps: DefaultProps = {
    style: { backgroundColor: 'transparent' },
  }

  state: State = {
    currentStatusBarHeight: 0
  }

  constructor(props) {
    super(props)
    this.state = { currentStatusBarHeight: StatusBarSizeIOS.currentHeight }
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
      <View style={[{ height: height }, this.props.style]} />
    )
  }
}
