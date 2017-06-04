import React from 'react'
import {View, StyleSheet} from 'react-native'
import ProductRow from '../components/ProductRow'
import Header from '../components/Header'
import {Product} from '../models'

interface Props {
  products: Array<Product>,
  title: string,
  color: string,
  titleStyle?: StyleSheet.Style
}
interface State {}

export default class ProductRowGroup extends React.PureComponent<Props, State> {
  render() {
    let {products, title, color} = this.props

    if (products.length === 0) return null

    return (
      <View style={{backgroundColor: color}}>
        <Header title={title} color={color} />
        {products.map((product: Product) => (
          <ProductRow key={product.id} product={product} color={color} />
        ))}
      </View>
    )
  }
}
