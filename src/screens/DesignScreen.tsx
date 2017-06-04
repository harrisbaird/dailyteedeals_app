import React from 'react'
import { ScrollView, StatusBar, View, StyleSheet, Text, Share, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-navigation'
import Header from '../components/Header'
import Icon from '../components/Icon'
import MoreFromArtist from '../components/MoreFromArtist'
import MoreFromCategory from '../components/MoreFromCategory'
import ProductImage from '../components/ProductImage'
import ProductRowGroup from '../components/ProductRowGroup'
import * as Theme from '../config/theme'
import { fetchArtist, invalidateArtist, toggleFavorite } from '../actions'

interface Props {
  navigation: Navigation,
  designs: Array<Object>,
  id: number
}
interface State {}

class DesignScreen extends React.PureComponent<Props, State> {
  static navigationOptions = ({navigation}) => {
    let design = navigation.state.params.design
    let product = design.products[0]
    return {
      title: design.name,
      headerStyle: {backgroundColor: product.images.primaryColor},
      headerTintColor: Theme.HEADER_TINT,
      tabBarIcon: ({tintColor}) => (
        <Icon name="heart" color={tintColor} size={20} />
      )
    }
  }

  render() {
    let {design} = this.props.navigation.state.params
    let mainProduct = design.products[0]
    let {backgroundColor, primaryColor} = mainProduct.images
    let remainingProducts = design.products.slice(1)

    return (
      <ScrollView>
        <StatusBar
          backgroundColor={primaryColor}
          animated={true}
        />

        <View style={{backgroundColor: backgroundColor}}>
          <ProductImage
            url={mainProduct.images.large}
            style={styles.squareImage}
          />
        </View>

        <ProductRowGroup
          products={[mainProduct]}
          title="Lowest Price"
          color={primaryColor}
          titleStyle={styles.title}
        />

        <ProductRowGroup
          products={remainingProducts}
          title="Also available on"
          color={primaryColor}
          titleStyle={styles.title}
        />

        {design.categories.length > 0 &&
          <MoreFromCategory 
            category={design.categories[0]}
            title={"More from" + design.categories[0].name}
          /> 
        }

        {design.categories.map((category) => (
          <TouchableOpacity key={category.id} onPress={() => this.props.navigation.navigate('CategoryDesigns', {
            categoryName: category.name,
            slug: category.slug
          })}>
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}

        <Header
          title={'More by ' + design.artist.name}
          color={Theme.SCREEN_BG}
          buttonText="Show All"
        />

        <MoreFromArtist artist={design.artist} />

        <Header
          title={'More from ' + design.artist.name}
          color={Theme.SCREEN_BG}
          buttonText="Show All"
        />

        <MoreFromArtist artist={design.artist} />
      </ScrollView >
    )
  }

  _share = () => {
    let {design} = this.props.navigation.state.params
    Share.share(
      {
        message: `Get ${design.name} by ${design.artist.name} ${design.url}`,
        url: design.url,
        title: design.name
      },
      {
        dialogTitle: 'Share ' + design.name
      }
    )
  }
}

const styles: any = StyleSheet.create({
  squareImage: {
    width: Theme.SCREEN_WIDTH,
    height: Theme.SCREEN_WIDTH
  },
  title: {
    fontFamily: Theme.FONT_DEFAULT,
    backgroundColor: Theme.BLACK_50,
    color: Theme.WHITE,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  }
})

const mapStateToProps = state => ({
  artistDesigns: state.artist.designs,
  favoriteDesignIds: state.settings.favoriteDesignIds
})

const mapDispatchToProps = dispatch => ({
  fetchArtist: slug => dispatch(fetchArtist(slug)),
  invalidateArtist: () => dispatch(invalidateArtist()),
  toggleFavorite: designID => dispatch(toggleFavorite(designID))
})

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DesignScreen)
