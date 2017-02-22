/* @flow */

import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, RefreshControl } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import Grid from 'react-native-grid-component'
import Icon from 'react-native-vector-icons/FontAwesome'

import { ITEM_MARGIN, COLOUR_SPINNER, COLOUR_HEADER_BG, COLOUR_HEADER_TEXT } from '../constants'
import DealItem from '../components/DealItem'
import { fetchDeals } from '../actions/requests'

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

    this.setState({ itemHeight: Dimensions.get('window').width / nextProps.itemsPerRow })
  }

  render() {
    return (
      <Grid
        data={this.props.deals}
        renderItem={this._renderItem.bind(this)}
        itemsPerRow={this.props.itemsPerRow}
        refreshControl={<RefreshControl
          refreshing={this.props.refreshing}
          onRefresh={this.props.fetchDeals}
          colors={[COLOUR_SPINNER]}
          tintColor={COLOUR_SPINNER} /> }
       />
    )
  }

  _renderItem(data: Object, row: number, col: number) {
    return (
      <View key={data.id} style={styles.item}>
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

const styles = StyleSheet.create({
  item: {
    flex:1,
    margin: ITEM_MARGIN
  }
})

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
