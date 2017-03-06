/* @flow */

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Theme from '../config/theme'

type Props = {
  navigation: StackNavigator,
  data: Object,
  itemHeight: number,
}

export default class CategoryItem extends React.PureComponent<void, Props, void> {
  render() {
    let { data, itemSize } = this.props
    let imageStyle = { width: itemSize, height: itemSize, backgroundColor: data.images.background_color }

    return (
      <View style={imageStyle}>
        <Image key={data.id} source={{uri: data.images.thumb_300}} style={[styles.image, imageStyle]}>
          <Text style={styles.overlayText} numberOfLines={3}>{data.name}</Text>
        </Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  overlayText: {
    color: Theme.colourWhite,
    backgroundColor: Theme.colourTransparent,
    fontSize: 20,
    padding: 10,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: Theme.colourBlack,
    textAlign: 'right',
  }
})
