/* @flow */

import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import { ITEM_MARGIN, COLOUR_BLACK, COLOUR_WHITE, COLOUR_TRANSPARENT } from '../config/constants'
import ProgressiveImage from './ProgressiveImage'
import TouchableItem from './TouchableItem'
import Icon from './Icon'
import Price from './Price'

type Props = {
  navigation: StackNavigator,
  data: Object,
  gridImagesOnly: boolean,
  itemHeight: number,
}

type State = {
  animationValue: Animated.Value,
}

class DealItem extends React.Component<void, Props, State> {
  state: State = {
    animationValue: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(
      this.state.animationValue,
      {
        toValue: 1,
        useNativeDriver: true,
      }
    ).start()
  }

  render() {
    let { data, gridImagesOnly, itemHeight } = this.props
    let { animationValue } = this.state

    return (
        <Animated.View style={[styles.container, {opacity: animationValue, transform: [{scale: animationValue}]}]}>
          <TouchableItem onPress={this._navigateToDetail.bind(this, data)} borderless={true}>
            <ProgressiveImage
              style={{height: itemHeight}}
              backgroundColor={data.images.background_color}
              thumbnailURL={data.images.loader}
              imageURL={data.images.thumb_300}>
              { !gridImagesOnly && this._renderOverlay(data)  }
            </ProgressiveImage>
          </TouchableItem>
        </Animated.View>
    )
  }

  _renderOverlay(data: Object) {
    return (
      <View style={styles.overlay}>
        <View style={styles.icons}>
          { data.last_chance && <Icon name="clock" style={[styles.overlayShadow, styles.icon]} /> }
        </View>

        <View style={styles.bottomText}>
          <View style={styles.topText}>
            <Price prices={data.prices} style={[styles.overlayShadow, styles.subText]} />
            <Text style={[styles.overlayShadow, styles.subText]}>{data.site.name}</Text>
          </View>
          <Text style={[styles.overlayShadow, styles.designNameText]} numberOfLines={1}>{data.design.name}</Text>
        </View>
      </View>
    )
  }

  _navigateToDetail(data) {
    const { navigate } = this.props.navigation
    navigate('Detail', { product: data, title: data.design.name })
  }
}

const mapStateToProps = (state) => ({gridImagesOnly: state.settings.gridImagesOnly})
export default connect(mapStateToProps)(DealItem)

var styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: ITEM_MARGIN
  },
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
  topText: {
    flexDirection: 'row'
  },
  bottomText: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 5,
  },
  overlay: {
    flex: 1,
  },
  overlayShadow: {
    color: COLOUR_WHITE,
    backgroundColor: COLOUR_TRANSPARENT,
    fontSize: 16,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: COLOUR_BLACK
  },
  designNameText: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: 'right',
    fontWeight: '900',
  },
  subText: {
    fontSize: 12,
    marginLeft: 5,
    fontWeight: 'bold',
  }
});
