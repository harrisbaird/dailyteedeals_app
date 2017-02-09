/* @flow */

/**
 * TouchableItem renders a touchable that looks native on both iOS and Android.
 *
 * It provides an abstraction on top of TouchableNativeFeedback and
 * TouchableOpacity.
 *
 * On iOS you can pass the props of TouchableOpacity, on Android pass the props
 * of TouchableNativeFeedback.
 *
 * Source: https://raw.githubusercontent.com/react-community/react-navigation/master/src/views/TouchableItem.js
 */
 
import React, { Component, PropTypes, Children } from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

const ANDROID_VERSION_LOLLIPOP = 21;

type Props = {
  onPress: Function,
  delayPressIn?: number;
  borderless?: boolean;
  pressColor?: string;
  activeOpacity?: number;
  children?: React.Element<*>;
  style?: any;
};

type DefaultProps = {
  pressColor: string;
};

export default class TouchableItem extends Component<DefaultProps, Props, void> {
  static propTypes = {
    onPress: PropTypes.func,
    delayPressIn: PropTypes.number,
    borderless: PropTypes.bool,
    pressColor: PropTypes.string,
    activeOpacity: PropTypes.number,
    children: PropTypes.node.isRequired,
    style: View.propTypes.style,
  };

  static defaultProps = {
    pressColor: 'rgba(0, 0, 0, .32)',
  };

  render() {
    /*
     * TouchableNativeFeedback.Ripple causes a crash on old Android versions,
     * therefore only enable it on Android Lollipop and above.
     *
     * All touchables on Android should have the ripple effect according to
     * platform design guidelines.
     * We need to pass the background prop to specify a borderless ripple effect.
     */
    if (Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP) {
      return (
        <TouchableNativeFeedback
          {...this.props}
          style={null}
          background={
            TouchableNativeFeedback.Ripple(
              this.props.pressColor,
              this.props.borderless
            )
          }
        >
          <View style={this.props.style}>
            {Children.only(this.props.children)}
          </View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity {...this.props}>
          {this.props.children}
        </TouchableOpacity>
      );
    }
  }
}
