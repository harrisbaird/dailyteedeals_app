import React from 'react'
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from './RoundedButton'
import Icon from './Icon'
import { formatMoney } from '../utils/money'
import * as Theme from '../config/theme'
import { Product } from '../models'

interface Props {
  product: Product,
  color: string,
  currency: string,
  style?: StyleSheet.Style
}
interface State { }

class ProductRow extends React.PureComponent<Props, State> {
  render() {
    let { product, currency, color, style } = this.props

    return (
      <TouchableOpacity onPress={() => Linking.openURL(product.buyURL)}>
        <View style={[{ backgroundColor: color }, style]}>
          <View style={styles.header}>
            <Text style={styles.siteName} numberOfLines={1}>
              {product.site.name}
            </Text>
            <RoundedButton title={'Buy for ' + formatMoney(product.prices, currency)} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderNotice(icon, text) {
    return (
      <View style={styles.notice}>
        <Text style={styles.noticeText}>
          <Icon name={icon} style={styles.icon} />
          {'  '}
          {text}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center'
  },
  siteName: {
    flex: 1,
    fontFamily: Theme.FONT_DEFAULT,
    fontSize: 16,
    color: Theme.WHITE
  },
  notice: {
    backgroundColor: Theme.WHITE_10
  },
  noticeText: {
    fontFamily: Theme.FONT_DEFAULT,
    fontSize: 12,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: Theme.WHITE
  },
  icon: {
    backgroundColor: Theme.TRANSPARENT
  }
})

const mapStateToProps = state => ({
  currency: state.settings.currency
})

export default connect(mapStateToProps)(ProductRow)
