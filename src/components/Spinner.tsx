import React from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'

export interface Props {}
export interface State {}

export default class Spinner extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color="#fff" size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
})