/* @flow */

import React from 'react';
import {
  View,
  Text,
  ListView,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Easing,
  InteractionManager,
} from 'react-native';

import { GRID_SIZE, GRID_ANIMATION_DELAY, ITEM_MARGIN, ITEM_BORDER_RADIUS } from '../constants'
import ProgressiveImage from './ProgressiveImage'


type Props = {
  data: Object,
  row: number;
  col: number;
  itemWidth: number;
};

type State = {
  animationFinished: boolean,
  animationValue: Animated.Value,
}

export default class DealItem extends React.Component {
  props: Props;
  state: State;

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired,
    itemWidth: React.PropTypes.number.isRequired,
  }

  constructor(props: Object) {
    super(props)
    this.state = {
      animationFinished: false,
      animationValue: new Animated.Value(0),
    }
  }

  componentDidMount() {
    let { row, col } = this.props

    // Animate the grid items so that they appear from top left to bottom right.
    let delay = (row + col) * GRID_ANIMATION_DELAY;

    Animated.timing(
      this.state.animationValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        delay: delay,
      }
    ).start((finished) => {
      if(finished) {
        InteractionManager.runAfterInteractions(() => {
          this.setState({animationFinished: true})
        })
      }
    })
  }

  render() {
    let { data, itemWidth } = this.props

    let containerStyles = {
      width: itemWidth,
      height: itemWidth,
      opacity: this.state.animationValue,
      transform: [{scale: this.state.animationValue}],
      backgroundColor: data.images.background_color,
    }

    // Don't render the image until animation has finished,
    // this should prevent stutter during animations.
    return (
      <Animated.View style={containerStyles}>
        {this.state.animationFinished && <ProgressiveImage
          backgroundColor={this.props.data.images.background_color}
          thumbnailURL={this.props.data.images.loader}
          imageURL={this.props.data.images.thumb_300}
          imageSize={itemWidth}
        />}
      </Animated.View>
    )
  }
}
