/* @flow */

import React from 'react';
import { Dimensions, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import Grid from 'react-native-grid-component'

import { COLOUR_SPINNER, COLOUR_HEADER_BG, COLOUR_HEADER_TEXT } from '../config/theme'
import DealItem from '../components/DealItem'
import Icon from '../components/Icon'
import { fetchDeals } from '../actions/requests'

type Props = {
  fetchDeals: Function,
  deals: Array<any>,
  refreshing: boolean,
  itemsPerRow: number,
}

class HomeScreen extends React.Component<void, Props, void> {
  static navigationOptions = {
    title: 'Daily Tee Deals',
    header: ({ navigate }) => ({
      style: { backgroundColor : COLOUR_HEADER_BG },
      tintColor: COLOUR_HEADER_TEXT,
      right: <Icon.Button
        name="cog"
        title="Settings"
        backgroundColor='transparent'
        onPress={() => navigate('SettingsList')} />
    })
  }

  componentDidMount() {
    this.props.fetchDeals()
  }

  componentWillReceiveProps(nextProps) {
    // Trigger update when changing grid size.
    // This is due to how the grid chunks multiple items into rows.
    if(this.props.itemsPerRow != nextProps.itemsPerRow) {
      nextProps.fetchDeals()
    }
  }

  render() {
    let itemHeight = Dimensions.get('window').width / this.props.itemsPerRow

    return (
      <Grid
        data={this.props.deals}
        itemsPerRow={this.props.itemsPerRow}
        renderItem={(data) => <DealItem
          key={data.id}
          data={data}
          itemHeight={itemHeight}
          navigation={this.props.navigation} /> }
        refreshControl={<RefreshControl
          refreshing={this.props.refreshing}
          onRefresh={this.props.fetchDeals}
          colors={[COLOUR_SPINNER]}
          tintColor={COLOUR_SPINNER} /> }
       />
    )
  }
}

const mapStateToProps = (state) => ({
  deals: state.deals.items,
  refreshing: state.deals.refreshing,
  itemsPerRow: state.settings.itemsPerRow,
})

const mapDispatchToProps = (dispatch) => ({
  fetchDeals: () => dispatch(fetchDeals()),
})

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
