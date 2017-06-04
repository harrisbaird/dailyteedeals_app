/*import React from 'react'
import {View, TextInput, StyleSheet, Platform} from 'react-native'
import * as Theme from '../config/theme'

interface Props { onChangeText: Function }
interface State {}

export default class SearchBar extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.barContainer}>
        <View style={styles.boxContainer}>
          <TextInput
            placeholder="Search"
            returnKeyType="search"
            onChangeText={this.props.onChangeText}
            style={styles.input}
            placeholderTextColor="#999"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  barContainer: {
    backgroundColor: Theme.PRIMARY,
    paddingTop: 20,
    height: 64,
    justifyContent: 'center'
  },
  boxContainer: {
    backgroundColor: Theme.WHITE,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: Platform.OS === 'ios' ? 5 : 0,
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    color: Theme.PRIMARY,
    height: 30
  }
})*/
