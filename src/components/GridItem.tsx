import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ProductImage from './ProductImage'
import PriceComponent from './Price'
import * as Theme from '../config/theme'
import { Images, Price } from '../models'

interface Props {
  title: string,
  subtitle: string,
  onPress: Function,
  images: Images,
  itemWidth?: number,
  itemMargin?: number,
  icons?: Array<string>,
  prices?: { [key: string]: Price },
}

interface DefaultProps {
  icons: Array<string>,
  backgroundColor: string,
  textBackgroundColor: string
}

interface State { }

export default class GridItem extends React.PureComponent<Props, State> {
  static defaultProps: DefaultProps = {
    icons: [],
    backgroundColor: '#000',
    textBackgroundColor: '#000'
  }

  render() {
    let {
      title,
      subtitle,
      prices,
      images,
      itemWidth,
      itemMargin
    } = this.props

    let textStyle = StyleSheet.flatten([styles.text, { color: images.darkBackgroundTextColor }])

    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <View style={[styles.container, { width: itemWidth, marginRight: itemMargin }]}>
          <ProductImage
            url={images.small}
            style={{ width: itemWidth, height: itemWidth }}
            background={images.backgroundColor}
          />

          <View style={[styles.textContainer, { backgroundColor: images.darkBackgroundColor }]}>
            <Text numberOfLines={1} style={[textStyle, styles.title]}>
              {title}
            </Text>
            <View style={styles.bottom}>
              {prices !== undefined &&
                <PriceComponent prices={prices} style={[textStyle, styles.price, styles.subtitle]} />}
              <Text numberOfLines={1} style={[textStyle, styles.subtitle]}>
                {subtitle}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    padding: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontFamily: Theme.FONT_DEFAULT,
    textShadowColor: Theme.TEXT_SHADOW,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  },
  price: {
    marginRight: 5,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: Theme.FONT_DEFAULT_BOLD
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 14
  }
})
