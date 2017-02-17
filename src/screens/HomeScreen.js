/* @flow */

import React from 'react';
import { View, Button, Dimensions, TouchableOpacity, RefreshControl } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import Grid from 'react-native-grid-component'

import { ITEM_MARGIN, DEAL_URL } from '../constants'
import DealItem from '../components/DealItem'
import * as actions from '../actions'

type Props = {
  navigation: StackNavigator,
  fetchDeals: Function,
  deals: Array<any>,
  refreshing: boolean,
  itemsPerRow: number,
}

type State = {
  itemHeight: number,
}

class HomeScreen extends React.Component<void, Props, State> {
  state: State = {
    itemHeight: 100,
  }

  componentDidMount() {
    let { itemsPerRow, fetchDeals } = this.props
    fetchDeals()

    this.setState({ itemHeight: Dimensions.get('window').width / itemsPerRow })
  }

  componentWillReceiveProps(nextProps) {
    // Trigger update when changing grid size.
    // This is due to how the grid chunks multiple items into rows.
    if(this.props.itemsPerRow != nextProps.itemsPerRow) {
      nextProps.fetchDeals()
    }
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <Grid
        data={this.props.deals}
        renderItem={this._renderItem.bind(this)}
        itemsPerRow={this.props.itemsPerRow}
        refreshControl={<RefreshControl
          refreshing={this.props.refreshing}
          onRefresh={this.props.fetchDeals} /> }
       />
    )
  }

  _renderItem(data: Object, row: number, col: number) {
    return (
      <View key={data.id} style={{flex:1, margin: ITEM_MARGIN}}>
        <TouchableOpacity onPress={this._showDetail.bind(this, data)}>
          <DealItem data={data} itemHeight={this.state.itemHeight} />
        </TouchableOpacity>
      </View>
    )
  }

  _showDetail(data) {
    const { navigate } = this.props.navigation
    navigate('Detail', { product: data, title: data.design.name })
  }
}

const mapStateToProps = (state) => ({
  deals: state.deals.items,
  refreshing: state.deals.refreshing,
  itemsPerRow: state.settings.itemsPerRow,
})

const mapDispatchToProps = (dispatch) => ({
  fetchDeals: () => {
    dispatch(actions.fetchDeals())
  }
})

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
