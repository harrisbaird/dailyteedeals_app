/* @flow */

import React from 'react';
import { StyleSheet, View, ListView, Dimensions, Easing, TouchableOpacity, RefreshControl } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import { ITEM_MARGIN, DEAL_URL } from '../constants'
import DealItem from '../components/DealItem'
import * as actions from '../actions'

// FIXME: This doesn't update after orientation change
let deviceWidth = Dimensions.get('window').width;

function chunk(arr, n) {
  return Array.from(Array(Math.ceil(arr.length/n)), (_,i)=>arr.slice(i*n,i*n+n))
}

type Props = {
  navigation: StackNavigator,
  fetchDeals: Function,
  deals: Array<any>,
  refreshing: boolean,
  itemsPerRow: number,
}

type State = {
  itemWidth: number,
  dataSource: ListView.DataSource,
};

class HomeScreen extends React.Component<void, Props, State> {
  state: State = {
    itemWidth: 0,
    dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
  }

  static navigationOptions = {
    title: 'Daily Tee Deals'
  }

  componentDidMount() {
    let { itemsPerRow, fetchDeals} = this.props

    // Calculate item width and margins
    const itemWidth = (deviceWidth - ITEM_MARGIN / 2 * itemsPerRow * 2) / itemsPerRow;
    this.setState({ itemWidth: itemWidth })

    fetchDeals()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._setupData(nextProps.deals))
    })
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={{flex: 1}}>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          initialListSize={10}
          enableEmptySections
          refreshControl={
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={this.props.fetchDeals}
            />
          }
        />
      </View>
    )
  }

  _renderRow(rowData: Array<any>, sectionID: number, rowID: number) {
    return (
      <View style={styles.row}>
        {rowData.map((data, col) => {
          if(data != null) {
            return this._renderItem(data, parseInt(rowID), col);
          } else {
            // Fill the last row
            return <View key={col} style={{width: deviceWidth / this.props.itemsPerRow}}/>
          }
        })}
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

  _setupData(data: Array<any>) {
    const rows = chunk(data, this.props.itemsPerRow);

    // Ensure the last row contains the correct number of items by adding
    // a placeholder.
    if (rows.length) {
      const lastRow = rows.slice(-1)[0]
      let wantItems = this.props.itemsPerRow - lastRow.length
      lastRow.push(...Array(wantItems).fill(null))
    }

    return rows
  }
}

const mapStateToProps = (state) => {
  return {
    deals: state.deals.items,
    refreshing: state.deals.refreshing,
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
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flex: 1,
    marginBottom: ITEM_MARGIN,
  },
});
