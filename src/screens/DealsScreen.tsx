import React from 'react'
import {connect} from 'react-redux'
import {Navigation} from 'react-navigation'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'
import Icon from '../components/Icon'
// import ORDER_TYPES from '../config/order_types'
import { fetchDeals } from '../actions'

interface Props {
  navigation: Navigation,
  fetchDeals: Function,
  designs: Array<Object>,
  refreshing: boolean,
  hiddenSites: Array<number>,
  defaultOrder: string
}

interface State {
  filteredDesigns: Array<Object>
}

class DealsScreen extends React.PureComponent<Props, State> {
  static navigationOptions = {
    headerTitle: 'Daily Tee Deals',
    tabBarLabel: 'Deals',
    headerBackTitle: undefined,
    tabBarIcon: ({tintColor}) => (
      <Icon name="home" color={tintColor} size={20} />
    )
  }

  state: State = {
    filteredDesigns: []
  }

  componentDidMount() {
    this.props.fetchDeals()
  }

  // componentWillReceiveProps(nextProps) {
  //   let {designs, defaultOrder, hiddenSites} = nextProps
  //   this.setState({
  //     filteredDesigns: designs
  //       .filter(design => !hiddenSites.includes(design.products[0].site.id))
  //       .sort(ORDER_TYPES[defaultOrder].sortFn)
  //   })
  // }

  render() {
    // if (this.props.refreshing) return <Spinner />

    console.log(this.props.designs.length)

    return (
      <Grid data={this.props.designs} renderItem={this._renderItem} />
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
        imageURL={deal.images.small_vignette}
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
  designs: state.deals.designs,
  refreshing: state.deals.refreshing,
  hiddenSites: state.settings.hiddenSites,
  defaultOrder: state.settings.defaultOrder
})

const mapDispatchToProps = dispatch => ({
  fetchDeals: () => dispatch(fetchDeals())
})

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DealsScreen)
