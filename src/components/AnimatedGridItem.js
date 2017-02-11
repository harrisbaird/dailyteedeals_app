/* @flow */

import React from 'react';
import {
  Animated,
  Easing,
  InteractionManager,
} from 'react-native';


type Props = {
  width: number,
  height: number,
  row: number,
  col: number,
  backgroundColor: string,
  animDuration?: number,
  animDelay?: number,
  animEasing?: Function,
  animRowLimit?: number,
  children?: React.Element<*>;
}

type DefaultProps = {
  backgroundColor: string,
  animDuration: number,
  animDelay: Function,
  animEasing: Function,
  animRowLimit: number,
}

type State = {
  animationFinished: boolean,
  animationValue: Animated.Value,
}

export default class AnimatedGridItem extends React.Component<DefaultProps, Props, State> {
  state: State = {
    animationFinished: false,
    animationValue: new Animated.Value(0),
  };

  static defaultProps = {
    backgroundColor: '#000',
    animDuration: 500,
    animDelay: AnimatedGridItem.defaultDelay,
    animEasing: Easing.linear,
    animRowLimit: 10,
  }

  static defaultDelay(row: number, col: number) {
    return 0
  }

  componentDidMount() {
    let { row, col, animDuration, animDelay, animEasing, animRowLimit } = this.props

    // Display immediately if above row limit
    if(row >= animRowLimit) {
      this.setState({animationValue: 1, animationFinished: true})
      return
    }

    Animated.timing(
      this.state.animationValue,
      {
        toValue: 1,
        duration: animDuration,
        delay: animDelay(row, col),
        easing: animEasing,
      }
    ).start((finished) => {
      // Once the grid animation has finished, display children.
      // This should prevent stutter during animations.
      if(finished) {
        InteractionManager.runAfterInteractions(() => {
          this.setState({animationFinished: true})
        })
      }
    })
  }

  render() {
    let { width, height, backgroundColor, children } = this.props

    let containerStyles = {
      width: width,
      height: height,
      opacity: this.state.animationValue,
      transform: [{scale: this.state.animationValue}],
      backgroundColor: backgroundColor,
    }

    return (
      <Animated.View style={containerStyles}>
        { this.state.animationFinished && children }
      </Animated.View>
    )
  }
}
