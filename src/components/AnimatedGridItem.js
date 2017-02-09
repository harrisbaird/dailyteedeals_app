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
  children?: React.Element<*>;
}

type DefaultProps = {
  backgroundColor: string,
  animDuration: number,
  animDelay: Function,
  animEasing: Function,
}

type State = {
  animationFinished: boolean,
  animationValue: Animated.Value,
}

export default class AnimatedGridItem extends React.Component {
  props: Props;
  defaultProps: DefaultProps;
  state: State;

  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired,
    children: React.PropTypes.node.isRequired,
    backgroundColor: React.PropTypes.string,
    animDuration: React.PropTypes.number,
    animDelay: React.PropTypes.func,
    animEasing: React.PropTypes.func,
  }

  static defaultProps = {
    backgroundColor: '#000',
    animDuration: 500,
    animDelay: AnimatedGridItem.defaultDelay,
    animEasing: Easing.linear,
  }

  static defaultDelay(row: number, col: number) {
    return 0
  }

  constructor(props: Object) {
    super(props)
    this.state = {
      animationFinished: false,
      animationValue: new Animated.Value(0),
    }
  }

  componentDidMount() {
    let { row, col, animDuration, animDelay, animEasing } = this.props

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
