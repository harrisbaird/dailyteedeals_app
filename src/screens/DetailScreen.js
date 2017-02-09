/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
  Dimensions,
} from 'react-native';
import ProgressiveImage from '../components/ProgressiveImage'
import { COLOUR_HEADER_BG, COLOUR_HEADER_TEXT } from '../constants'


export default class DetailScreen extends Component {
  static navigationOptions = {
    title: ({ state }) => `${state.params.title}`,
    header: {
      style: { backgroundColor : COLOUR_HEADER_BG },
      tintColor: COLOUR_HEADER_TEXT
    },
  };

  render() {
    const {state} = this.props.navigation;
    const window = Dimensions.get('window');

    return (
      <View>
        <ProgressiveImage
          backgroundColor={state.params.product.images.background_color}
          thumbnailURL={state.params.product.images.thumb_300}
          imageURL={state.params.product.images.thumb_1200}
          imageSize={window.width}
        />
      </View>
    );
  }

  _goBack = () => {
    this.props.navigator.pop();
  }
}
