import React from 'react'
import { View, Animated, Easing, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { Image as ImageProgress } from 'react-native-image-progress'
import ProgressBar from 'react-native-progress/Bar'
import { CustomCachedImage } from "react-native-img-cache"


type Props = {
  url: string,
  style: StyleSheet.Style,
  background?: string,
  cache?: Boolean
}

type State = {}

/**
 * `ProductImage` fades the image once loaded and adds a vignette overlay.
 */
export default class ProductImage extends React.PureComponent<Props, State> {
  public static defaultProps: Partial<Props> = {
    background: '#000',
    cache: false
  }

  render() {
    let { url, style, background, cache } = this.props

    return (
      <View style={[style, { backgroundColor: background }]}>
        <CustomCachedImage
          component={Image}
          indicator={ProgressBar}
          style={style}
          source={{ uri: url }}
        />
      </View>
    )
  }
}
