/* @flow */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Theme from '../config/theme'
import TabIcon from '../components/TabIcon'

class CategoriesScreen extends React.PureComponent<void, Props, void> {
  static navigationOptions = {
    title: 'Categories',
    tabBar: {
      icon: ({ tintColor }) => (<TabIcon name='cog' tintColor={tintColor} />),
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Categories</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Theme.colourWhite,
  }
})
