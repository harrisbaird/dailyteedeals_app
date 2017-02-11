/* @flow */

import React from 'react'
import { View, Image, StyleSheet, Animated, Easing } from 'react-native'

type Props = {
  backgroundColor: string,
  thumbnailURL: string,
  imageURL: string,
  imageSize: number,
};

type State = {
  imageOpacity: Animated.Value;
};

export default class ProgressiveImage extends React.Component<void, Props, State> {
  state: State = {
    imageOpacity: new Animated.Value(0),
  }

  // Fade in the main image once it has loaded.
  onImageLoaded() {
    Animated.timing(this.state.imageOpacity, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.quad),
    }).start()
  }

  render() {
    let { backgroundColor, thumbnailURL, imageURL, imageSize } = this.props

    return (
      <View style={{width: imageSize, height: imageSize, backgroundColor: backgroundColor}}>
        <Image
          style={styles.image}
          source={{uri: thumbnailURL}}
        />
        <Animated.Image
          style={[styles.image, {opacity: this.state.imageOpacity}]}
          source={{uri: imageURL}}
          onLoad={() => this.onImageLoaded()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})
