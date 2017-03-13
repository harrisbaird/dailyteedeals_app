/* @flow */

import React from 'react'
import { View, Image } from 'react-native'

type Props = {
  size: number,
  uri: string,
  backgroundColor: string,
  style?: Object,
  children?: React.Element<*>,
}

export default class StatusBarPadding extends React.Component<void, Props, void> {
  render() {
    let { size, backgroundColor, uri, style, children } = this.props

    return (
      <View style={[{ width: size, height: size, backgroundColor: backgroundColor }, style]}>
        <Image source={{ uri: uri }} style={{ width: size, height: size }}>
          { children }
        </Image>
      </View>
    )
  }
}
