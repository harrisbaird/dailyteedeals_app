/* @flow */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import ProgressiveImage from './ProgressiveImage'

type Props = {
  data: Object,
  itemWidth: number;
};

export default class DealItem extends React.Component<void, Props, void> {

  render() {
    let { data, itemWidth } = this.props

    return (
      <View>
        <ProgressiveImage
          backgroundColor={data.images.background_color}
          thumbnailURL={data.images.loader}
          imageURL={data.images.thumb_300}
          imageSize={itemWidth} />
        <Text style={styles.boxText} numberOfLines={1}>{data.design.name}</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  boxText: {
    flex: 1,
    fontWeight: '900',
    fontSize: 12,
    color: 'white',
    position: 'absolute',
    bottom: 5,
    right: 10,
    margin: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    opacity: .95,
  }
});
