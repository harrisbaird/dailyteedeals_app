/* @flow */

import React from 'react';
import { Text, Image, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Theme from '../config/theme'

type Props = {
  navigation: StackNavigator,
  data: Object,
  itemHeight: number,
}

export default class CategoryRow extends React.PureComponent<void, Props, void> {
  render() {
    let { data, itemHeight } = this.props
    let imageStyle = { height: itemHeight }

    return (
      <Image key={data.id} source={{uri: data.images.thumb_300}} style={[styles.image, imageStyle]}>
        <Text style={styles.overlayText} numberOfLines={1}>{data.name}</Text>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlayText: {
    color: Theme.colourWhite,
    backgroundColor: Theme.colourTransparent,
    fontSize: 25,
    padding: 20,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: Theme.colourBlack,
  }
})
