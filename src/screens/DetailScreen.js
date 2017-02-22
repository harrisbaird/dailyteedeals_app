/* @flow */

import React from 'react';
import { ScrollView, Dimensions, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import ProgressiveImage from '../components/ProgressiveImage'
import Icon from '../components/Icon'
import { COLOUR_HEADER_BG, COLOUR_HEADER_TEXT } from '../config/constants'
import { showShareDialog } from '../utils'

type Props = {
  navigation: StackNavigator,
}

export default class DetailScreen extends React.Component <void, Props, void> {
  static navigationOptions = {
    title: ({ state }) => `${state.params.title}`,
    header: ({ navigate, state }) => {
      return {
      style: { backgroundColor : COLOUR_HEADER_BG },
      tintColor: COLOUR_HEADER_TEXT,
      right: <Icon.Button
        name={Platform.OS == 'ios' ? 'share-ios' : 'share-android'}
        title="Share"
        backgroundColor='transparent'
        onPress={() => showShareDialog(state.params.product)} />
    }}
  }

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
      </ScrollView>
    );
  }
}
