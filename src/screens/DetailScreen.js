/* @flow */

import React from 'react';
import { ScrollView, Dimensions } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import ProgressiveImage from '../components/ProgressiveImage'
import ShareButton from '../components/ShareButton'
import { COLOUR_HEADER_BG, COLOUR_HEADER_TEXT } from '../constants'

type Props = {
  navigation: StackNavigator,
}

export default class DetailScreen extends React.Component <void, Props, void> {
  static navigationOptions = {
    title: ({ state }) => `${state.params.title}`,
    header: ({ navigate }) => ({
      style: { backgroundColor : COLOUR_HEADER_BG },
      tintColor: COLOUR_HEADER_TEXT,
      right: <Icon.Button
        name="share"
        title="ADD"
        backgroundColor='transparent'
        onPress={() => navigate('SettingsList')} />
    })
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
        <ShareButton product={state.params.product}/>
      </ScrollView>
    );
  }
}
