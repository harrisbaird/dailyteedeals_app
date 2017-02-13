/* @flow */

import React from 'react';
import { StyleSheet, View, ListView, Dimensions, Easing, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import { GRID_ANIMATION_DELAY, ITEM_MARGIN, DEAL_URL } from '../constants'
import ItemGrid from '../components/ItemGrid';
import DealItem from '../components/DealItem';
import LoadingSpinner from '../components/LoadingSpinner';
import * as actions from '../actions'

type Props = {
  navigation: StackNavigator,
  fetchDeals: Function,
  deals: Array<any>,
  itemsPerRow: number,
}

type State = {
  itemWidth: number
}

class HomeScreen extends React.Component<void, Props, State>{
  state: State = {
    itemWidth: 0,
  }

  static navigationOptions = {
    title: 'Daily Tee Deals'
  }

  constructor(props: Object) {
    super(props);

    // Calculate item width and margins
    let deviceWidth = Dimensions.get('window').width;
    const itemWidth = (deviceWidth - ITEM_MARGIN / 2 * props.itemsPerRow * 2) / props.itemsPerRow;
    this.state = { itemWidth: itemWidth }
  }

  componentDidMount() {
    this.props.fetchDeals()
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={{flex: 1}}>
        <ItemGrid
          data={this.props.deals}
          itemsPerRow={this.props.itemsPerRow}
          renderItem={this._renderItem.bind(this)} />
        <LoadingSpinner />
      </View>
    )
  }

  _renderItem(data: Object, row: number, col: number) {
    const { itemWidth } = this.state

    return (
      <View key={data.id} style={styles.itemContainer}>
        <TouchableOpacity onPress={this._showDetail.bind(this, data)}>
          <DealItem data={data} itemWidth={itemWidth} />
        </TouchableOpacity>
      </View>
    )
  }

  _showDetail(data) {
    const { navigate } = this.props.navigation
    navigate('Detail', { product: data, title: data.design.name })
  }
}

const mapStateToProps = (state) => {
  return {
    deals: state.deals.items,
    itemsPerRow: state.settings.itemsPerRow,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDeals: () => {
    dispatch(actions.fetchDeals())
  }
})

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(HomeScreen)

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: ITEM_MARGIN,
  }
});
