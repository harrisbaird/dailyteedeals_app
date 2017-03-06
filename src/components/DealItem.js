/* @flow */

import React from 'react'
import { View, Text, Image, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import Theme from '../config/theme'
import TouchableItem from './TouchableItem'
import Icon from './Icon'
import Price from './Price'

type Props = {
  navigation: StackNavigator,
  data: Object,
  gridImagesOnly: boolean,
  itemSize: number,
}

type State = {
  animationValue: Animated.Value,
}

class DealItem extends React.PureComponent<void, Props, State> {
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
    let { data, gridImagesOnly, itemSize } = this.props
    let { animationValue } = this.state
    let imageStyle = { width: itemSize, height: itemSize, backgroundColor: data.images.background_color }

    return (
      <Animated.View style={[styles.container, imageStyle, {opacity: animationValue, transform: [{scale: animationValue}]}]}>
        <TouchableItem onPress={this._navigateToDetail.bind(this, data)} borderless={true}>
          <Image style={imageStyle} source={{uri: data.images.thumb_300}}>
            { !gridImagesOnly && this._renderOverlay(data)  }
          </Image>
        </TouchableItem>
      </Animated.View>
    )
  }

  _renderOverlay(data: Object) {
    return (
      <View style={styles.overlay}>
        <View style={styles.topOverlay}>
          <View style={styles.icons}>
            { data.last_chance && <Icon name="clock" style={[styles.overlayShadow, styles.icon]} /> }
          </View>
          <Price prices={data.prices} style={[styles.overlayShadow]} />
        </View>

        <View style={styles.bottomOverlay}>
          <Text style={[styles.overlayShadow, styles.subText]} numberOfLines={1}>{data.site.name}</Text>
          <Text style={[styles.overlayShadow, styles.designNameText]} numberOfLines={1}>{data.design.name}</Text>
        </View>
      </View>
    )
  }

  _navigateToDetail(data) {
    const { navigate } = this.props.navigation
    navigate('DealDetail', { product: data, title: data.design.name })
  }
}

const mapStateToProps = (state) => ({gridImagesOnly: state.settings.gridImagesOnly})
export default connect(mapStateToProps)(DealItem)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 20,
  },
  topOverlay: {
    flexDirection: 'row',
    padding: 5,
  },
  bottomOverlay: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 5,
  },
  overlay: {
    flex: 1,
  },
  overlayShadow: {
    color: Theme.colourWhite,
    backgroundColor: Theme.colourTransparent,
    fontSize: 16,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: Theme.colourBlack
  },
  designNameText: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: 'right',
  },
  subText: {
    fontSize: 12,
  }
});
