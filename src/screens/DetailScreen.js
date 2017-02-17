/* @flow */

import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ListView,
  Text,
  Dimensions,
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import ProgressiveImage from '../components/ProgressiveImage'
import ShareButton from '../components/ShareButton'
import { COLOUR_HEADER_BG, COLOUR_HEADER_TEXT } from '../constants'

type Props = {
  navigation: StackNavigator,
}

export default class DetailScreen extends React.Component <void, Props, void> {
  render() {
    const {state} = this.props.navigation
    const imageSize = Dimensions.get('window').width

    return (
      <ScrollView>
        <ProgressiveImage
          style={{ width: imageSize, height: imageSize }}
          backgroundColor={state.params.product.images.background_color}
          thumbnailURL={state.params.product.images.thumb_300}
          imageURL={state.params.product.images.thumb_1200}
        />
        <ShareButton product={state.params.product}/>
      </ScrollView>
    );
  }
}
