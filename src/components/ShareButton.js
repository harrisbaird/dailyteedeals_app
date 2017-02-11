/* @flow */

import React from 'react'
import { View, Text, TouchableHighlight, Share, StyleSheet } from 'react-native'

type Props = {
  product: Object,
};

export default class ShareButton extends React.Component<void, Props, void> {
  render() {
    return (
      <TouchableHighlight style={styles.wrapper} onPress={this._doShare.bind(this)}>
        <View style={styles.button}>
          <Text>Share</Text>
        </View>
      </TouchableHighlight>
    )
  }

  _doShare() {
    let { product } = this.props

    let designName = product.design.name
    let artistName = product.design.artist.name

    // TODO: Use website product url rather than buy url

    Share.share({
      message: `Get ${designName} by ${artistName} ${product.buy_url}`,
      url: product.buy_url,
      title: product.design.name
    }, {
      dialogTitle: 'Share ' + product.design.name
    });
  }
}

var styles = StyleSheet.create({
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
});
