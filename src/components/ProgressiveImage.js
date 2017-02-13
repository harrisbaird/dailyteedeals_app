/* @flow */

import React from 'react'
import { View, Image, StyleSheet, Animated, Easing } from 'react-native'

type Props = {
  backgroundColor: string,
  thumbnailURL: string,
  imageURL: string,
  imageSize: number,
  children?: React.Element<*>;
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
      useNativeDriver: true,
    }).start()
  }

  render() {
    let { backgroundColor, thumbnailURL, imageURL, imageSize } = this.props

    return (
      <View style={{width: imageSize, height: imageSize, backgroundColor: backgroundColor}}>
        <Image
          style={styles.image}
          source={{uri: thumbnailURL}}>
          <Animated.Image
            style={[styles.image, {opacity: this.state.imageOpacity}]}
            source={{uri: imageURL}}
            onLoad={() => this.onImageLoaded()}>
            {this.props.children}
          </Animated.Image>
        </Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
})
