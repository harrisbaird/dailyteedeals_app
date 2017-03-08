/* @flow */

import React from 'react';
import { Text, Image, Button, StyleSheet, ScrollView, Dimensions, Linking } from 'react-native'
import { connect } from 'react-redux'
import Price from '../components/Price'
import Theme from '../config/theme'

type Props = {
  deals: Array<*>,
  index: number
}

class DealDetail extends React.PureComponent <void, Props, void> {
  render() {
    const imageSize = Dimensions.get('window').width
    let { deals, index } = this.props
    let deal = deals[index]

    return (
      <ScrollView>
        <Image
          style={{ width: imageSize, height: imageSize }}
          source={{ uri: deal.images.thumb_1200 }}
        />
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

const mapStateToProps = (state) => ({
  deals: state.deals.items,
})

export default connect(mapStateToProps)(DealDetail)
