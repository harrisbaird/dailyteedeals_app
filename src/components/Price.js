/* @flow */

import React from 'react';
import { Text } from 'react-native'
import { connect } from 'react-redux'
import CURRENCIES from '../config/currencies'

type Props = {
  prices: {[key: string]: any},
  currency: string,
  style?: Object,
}

class Price extends React.PureComponent<void, Props, void> {
  render() {
    let { prices, currency, style } = this.props
    let price = prices[currency]

    // Product prices are in cents,
    // Convert to float and round up amount to nearest whole unit
    // Not ideal but will do
    let amount = Math.ceil(price.amount/100)

    return (
      <Text style={style}>{CURRENCIES[currency].symbol}{amount}</Text>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.settings.currency,
})

export default connect(
	mapStateToProps,
)(Price)
