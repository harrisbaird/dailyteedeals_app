/* @flow */

import React from 'react'
import { View, Text, Dimensions, RefreshControl, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Grid from 'react-native-grid-component'
import Theme from '../config/theme'
import TabIcon from '../components/TabIcon'
import DealItem from '../components/DealItem'
import StatusBarPadding from '../components/StatusBarPadding'
import { fetchDeals } from '../actions/requests'

type Props = {
  fetchDeals: Function,
  deals: Array<any>,
  refreshing: boolean,
  itemsPerRow: number,
}

class HomeScreen extends React.Component<void, Props, void> {
  static navigationOptions = {
    title: "Today's Deals",
    tabBar: {
      icon: ({ tintColor }) => (<TabIcon name='cog' tintColor={tintColor} />),
    },
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
      <StatusBarPadding style={styles.container}>
        <Grid
          data={this.props.deals}
          itemsPerRow={this.props.itemsPerRow}
          renderHeader={this._renderHeader}
          renderItem={(data) => <DealItem
            key={data.id}
            data={data}
            itemHeight={itemHeight}
            navigation={this.props.navigation} /> }
          refreshControl={<RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.props.fetchDeals}
            colors={[Theme.colourSpinner()]}
            tintColor={Theme.colourSpinner()} /> }
         />
     </StatusBarPadding>
    )
  }

  _renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Header</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  headerText: {
    color: Theme.colourWhite
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
