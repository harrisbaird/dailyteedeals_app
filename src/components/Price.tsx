
import React from 'react'
import {Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {formatMoney} from '../utils/money'
import {Price} from '../models'

interface Props {
  prices: {[key: string]: Price},
  currency: string,
  style?: StyleSheet.Style
}

interface State {}

class PriceComponent extends React.PureComponent<Props, State> {
  render() {
    let {prices, currency, style} = this.props
    return <Text style={style}>{formatMoney(prices, currency)}</Text>
  }
}

const mapStateToProps = state => ({
  currency: state.settings.currency
})

export default connect(mapStateToProps)(PriceComponent)
