/* @flow */

import React from 'react'
import { StyleSheet } from 'react-native'
import Icon from '../components/Icon'

type Props = {
  name: string,
  tintColor: string
}

export default class TabIcon extends React.Component<void, Props, void> {
  render() {
    return <Icon
      name={this.props.name}
      style={[styles.icon, {color: this.props.tintColor}]} />
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 25
  }
})
