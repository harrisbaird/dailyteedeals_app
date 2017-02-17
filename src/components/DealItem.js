/* @flow */

import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import ProgressiveImage from './ProgressiveImage'
import Price from './Price'

type Props = {
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
      <Animated.View style={{ flex: 1, opacity: animationValue, transform: [{scale: animationValue}]}}>
        <ProgressiveImage
          style={{flex:1, height: itemHeight}}
          backgroundColor={data.images.background_color}
          thumbnailURL={data.images.loader}
          imageURL={data.images.thumb_300}>
          { !gridImagesOnly && this._renderExtras(data)  }
        </ProgressiveImage>
      </Animated.View>
    )
  }

  _renderExtras(data: Object) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.icons}>
          { data.last_chance && <Icon name="clock-o" style={[styles.overlay, styles.icon]} /> }
        </View>

        <View style={[styles.bottomText]}>
          <View style={{ flexDirection: 'row' }}>
            <Price prices={data.prices} style={[{ marginRight: 5, fontWeight: 'bold' }, styles.overlay, styles.subText]} />
            <Text style={[styles.overlay, styles.subText]}>{data.site.name}</Text>
          </View>
          <Text style={[styles.overlay, styles.designNameText]} numberOfLines={1}>{data.design.name}</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({gridImagesOnly: state.settings.gridImagesOnly})
export default connect(mapStateToProps)(DealItem)

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
