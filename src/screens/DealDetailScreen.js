/* @flow */

import React from 'react';
import { Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Icon from '../components/Icon'
import DealDetail from '../components/DealDetail'

type Props = {
  navigation: StackNavigator,
}

export default class DetailScreen extends React.PureComponent <void, Props, void> {
  static navigationOptions = {
    title: ({ state }) => `${state.params.title}`,
    header: ({ navigate, state }) => ({
      right: <Icon.Button
        name={Platform.OS == 'ios' ? 'share-ios' : 'share-android'}
        title="Share"
        backgroundColor='transparent' />
    })
  }

  render() {
    const {state} = this.props.navigation
    let index = state.params.index
    return <DealDetail index={index} />
  }
}
