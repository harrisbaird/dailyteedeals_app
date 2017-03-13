/* @flow */

import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, Linking } from 'react-native'
import StatusBarPadding from '../components/StatusBarPadding'
import Price from '../components/Price'
import SquareImage from '../components/SquareImage'
import Theme from '../config/theme'

type Props = {
  deal: Object,
}

export default class DealDetail extends React.PureComponent <void, Props, void> {
  render() {
    let { deal } = this.props

    return (
      <ScrollView>
        <View>
          <StatusBarPadding style={{ backgroundColor: deal.images.background_color }} />
          <SquareImage
            size={Theme.screenWidth}
            backgroundColor={deal.images.background_color}
            uri={ deal.images.thumb_1200 }
          />
        </View>
        <Button
          title='Buy'
          color='#fff'
          onPress={() => Linking.openURL(deal.buy_url)} />
        <Text style={styles.text}>Design by {deal.design.artist.name}</Text>
        <Price prices={deal.prices} style={styles.text} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: Theme.colourWhite
  }
})
