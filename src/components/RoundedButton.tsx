import React from 'react'
import {Text, StyleSheet} from 'react-native'
import * as Theme from '../config/theme'

interface Props {
  title: string,
}
interface State {}

export default class RoundedButton extends React.Component<Props, State> {
  render() {
    return <Text style={styles.text}>
      {this.props.title}
    </Text>
  }
}

const styles = StyleSheet.create({
  text: {
    color: Theme.WHITE,
    backgroundColor: Theme.BLACK_50,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    overflow: 'hidden',
    fontFamily: Theme.FONT_DEFAULT_BOLD,
    fontSize: 14
  }
})