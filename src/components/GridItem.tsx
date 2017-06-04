import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ProductImage from './ProductImage'
import PriceComponent from './Price'
import Icon from './Icon'
import * as Theme from '../config/theme'
import {Price} from '../models'

interface Props {
  title: string,
  subtitle: string,
  imageURL: string,
  onPress: Function,
  itemWidth?: number,
  itemMargin?: number,
  icons?: Array<string>,
  prices?:{[key: string]: Price},
  backgroundColor?: string,
  textBackgroundColor?: string
}

interface DefaultProps {
  icons: Array<string>,
  backgroundColor: string,
  textBackgroundColor: string
}

interface State {}

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
      imageURL,
      backgroundColor,
      textBackgroundColor,
      icons,
      prices,
      itemWidth,
      itemMargin
    } = this.props

    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <View
          style= {[
            styles.container,
            {
              width: itemWidth,
              marginRight: itemMargin,
              backgroundColor: backgroundColor
            }
          ]}
        >
          <ProductImage
            url={imageURL}
            style={{width: itemWidth, height: itemWidth}}
          >
            <View style={styles.imageOverlay}>
              <View style={styles.icons}>
                {icons.map(name => (
                  <Icon
                    key={name}
                    name={name}
                    size={26}
                    color={Theme.WHITE}
                  />
                ))}
              </View>

              {prices !== undefined &&
                <PriceComponent prices={prices} style={[styles.text, styles.price]} />}
            </View>
          </ProductImage>

          <View style={[styles.textContainer, {backgroundColor: textBackgroundColor}]}>
            <Text numberOfLines={1} style={[styles.text, styles.title]}>
              {title}
            </Text>
            <View style={styles.bottom}>
              <Text numberOfLines={1} style={[styles.text, styles.subtitle]}>
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
  imageOverlay: {
    backgroundColor: Theme.TRANSPARENT,
    padding: 10,
    flexDirection: 'row'
  },
  icons: {
    flex: 1
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
    color: Theme.TEXT,
    textShadowColor: Theme.TEXT_SHADOW,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  },
  price: {
    fontSize: 16,
    fontFamily: Theme.FONT_DEFAULT_BOLD
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
