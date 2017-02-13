/* @flow */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressiveImage from './ProgressiveImage'

type Props = {
  data: Object,
  itemWidth: number;
};

export default class DealItem extends React.Component<void, Props, void> {
  // TODO: Coupon
  // TODO: Last chance
  // TODO: Prices
  // TODO: Site

  render() {
    let { data, itemWidth } = this.props

    return (
      <View>
        <ProgressiveImage
          backgroundColor={data.images.background_color}
          thumbnailURL={data.images.loader}
          imageURL={data.images.thumb_300}
          imageSize={itemWidth}>
          <View style={styles.icons}>
            { data.last_chance &&
              <Icon name="clock-o" style={[styles.overlay, styles.icon]} />
            }
          </View>

          <View style={[styles.bottomText]}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[{ marginRight: 5, fontWeight: 'bold' }, styles.overlay, styles.subText]}>£12</Text>
              <Text style={[styles.overlay, styles.subText]}>{data.site.name}</Text>
            </View>
            <Text style={[styles.overlay, styles.designNameText]} numberOfLines={1}>{data.design.name}</Text>
          </View>
        </ProgressiveImage>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 5,
  },
  icon: {
    fontSize: 20,
  },
  bottomText: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 5,
  },
  overlay: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 16,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#000'
  },
  designNameText: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: 'right',
    fontWeight: '900',
  },
  subText: {
    fontSize: 12,
  }

});
