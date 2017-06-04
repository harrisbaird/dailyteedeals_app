import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import {Navigation} from 'react-navigation'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'
import {fetchArtist, invalidateArtist} from '../actions'
import * as Theme from '../config/theme'
import{Artist, Design} from '../models'

interface Props {
  navigation: Navigation,
  artist: Artist,
  designs: Array<Design>,
  fetchArtist: Function,
  invalidateArtist: Function
}
interface State {}

class MoreFromArtist extends React.PureComponent<Props, State> {
  componentDidMount() {
    this.props.fetchArtist(this.props.artist.slug)
  }

  // componentWillUnmount() {
  //   this.props.invalidateArtist()
  // }

  render() {
    let {designs} = this.props

    let filtered = designs.slice(0, Theme.GRID_ITEMS_PER_ROW)

    return (
      <View style={{backgroundColor: Theme.BLACK_50}}>
        <Grid data={filtered} renderItem={this._renderItem} />
      </View>
    )
  }

  _renderItem = ({item}) => {
    let deal = item.products[0]

    return (
      <GridItem
        key={item.id}
        title={item.name}
        subtitle={deal.site.name}
        icons={deal.lastChance ? ['clock'] : []}
        backgroundColor={deal.images.backgroundColor}
        textBackgroundColor={deal.images.primaryColor}
        imageURL={deal.images.small}
        prices={deal.prices}
        onPress={() =>
          this.props.navigation.navigate('Design', {
            design: item
          })}
      />
    )
  }
}

const mapStateToProps = state => ({
  designs: state.artist.designs,
  currency: state.settings.currency
})

const mapDispatchToProps = dispatch => ({
  fetchArtist: slug => dispatch(fetchArtist(slug)),
  invalidateArtist: () => dispatch(invalidateArtist())
})

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MoreFromArtist)
