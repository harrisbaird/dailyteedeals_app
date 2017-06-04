import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import RoundedButton from '../components/RoundedButton'
import * as Theme from '../config/theme'

interface Props {
  title: string,
  color: string,
  buttonText?: string
}
interface State {}

export default class Header extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.title}</Text>
        {this.props.buttonText !== undefined &&
          <RoundedButton title={this.props.buttonText} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.BLACK_40,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center'
  },
  text: {
    flex: 1,
    backgroundColor: Theme.TRANSPARENT,
    fontFamily: Theme.FONT_DEFAULT_BOLD,
    color: Theme.WHITE
  }
})