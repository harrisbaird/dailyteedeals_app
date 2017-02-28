/* @flow */

import React from 'react';
import { Text, Button, StyleSheet, ScrollView, Dimensions, Platform, Linking } from 'react-native'
import { StackNavigator } from 'react-navigation'
import ProgressiveImage from '../components/ProgressiveImage'
import Icon from '../components/Icon'
import Price from '../components/Price'
import Theme from '../config/theme'
import { showShareDialog } from '../utils'

type Props = {
  navigation: StackNavigator,
}

export default class DetailScreen extends React.PureComponent <void, Props, void> {
  static navigationOptions = {
    title: ({ state }) => `${state.params.title}`,
    header: ({ navigate, state }) => ({
      right: <Icon.Button
        name={Platform.OS == 'ios' ? 'share-ios' : 'share-android'}
        title="Share"
        backgroundColor='transparent'
        onPress={() => showShareDialog(state.params.product)} />
    })
  }

  render() {
    const {state} = this.props.navigation
    const imageSize = Dimensions.get('window').width
    let product = state.params.product

    return (
      <ScrollView>
        <ProgressiveImage
          style={{ width: imageSize, height: imageSize }}
          backgroundColor={product.images.background_color}
          thumbnailURL={product.images.thumb_300}
          imageURL={product.images.thumb_1200}
        />
        <Button
          title='Buy'
          color='#fff'
          onPress={() => Linking.openURL(product.buy_url)} />
        <Text style={styles.text}>Design by {product.design.artist.name}</Text>
        <Price prices={product.prices} style={styles.text} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: Theme.colourWhite
  }
})
