import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from './Icon'
import * as Theme from '../config/theme'

interface Props {}
interface State {}

export default class NoFavorites extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon name="heart" style={styles.icon} />
        </View>
        <Text style={styles.text}>You haven't added any favorite designs yet</Text>
        <Text style={styles.text}> Click on hearts to add some.</Text>
      </View>
    )
  }
}

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: Theme.ACCENT,
    fontSize: 50
  },
  text: {
    color: '#fff',
    fontFamily: Theme.FONT_DEFAULT,
    fontSize: 12
  }
})
