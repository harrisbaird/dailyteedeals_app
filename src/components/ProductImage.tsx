import React from 'react'
import {Animated, Easing, Image, StyleSheet} from 'react-native'

type Props = {
  url: string,
  style: StyleSheet.Style,
  children?: JSX.Element
}

type State = {
  imageAnim: Animated.Value
  childrenAnim: Animated.Value
}

/**
 * `ProductImage` fades the image once loaded and adds a vignette overlay.
 */
export default class ProductImage extends React.PureComponent<Props, State> {
  state: State = {
    imageAnim: new Animated.Value(0),
    childrenAnim: new Animated.Value(0)
  }

  render() {
    let {url, style, children} = this.props

    return (
      <Animated.Image
        source={{uri: url}}
        style={[style, {opacity: this.state.imageAnim}]}
        onLoad={this._onLoad}
      >
        <Image source={require('../../assets/vignette.png')} style={[styles.flex, style]}>
          <Animated.View style={[styles.flex, {opacity: this.state.childrenAnim}]}>
            {children}
          </Animated.View>
        </Image>
      </Animated.Image>
    )
  }

  _onLoad = () => {
    const minimumWait = 100
    const staggerNonce = 200 * Math.random()

    Animated.sequence([
      Animated.timing(this.state.imageAnim, {
        toValue: 1,
        duration: 350,
        delay: minimumWait + staggerNonce,
        easing: Easing.out(Easing.linear)
      }),
      Animated.timing(this.state.childrenAnim, {
        toValue: 1,
        duration: 350,
        delay: minimumWait + staggerNonce,
        easing: Easing.in(Easing.linear)
      })
    ]).start()
  }
}

const styles: any = StyleSheet.create({
  flex: {
    flex: 1
  }
})