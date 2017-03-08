/* @flow */

import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import FlatList from 'react-native/Libraries/CustomComponents/Lists/FlatList'
import { connect } from 'react-redux'
import Theme from '../config/theme'
import TabIcon from '../components/TabIcon'
import DealItem from '../components/DealItem'
import StatusBarPadding from '../components/StatusBarPadding'
import { fetchDeals } from '../actions/requests'

type Props = {
  fetchDeals: Function,
  deals: Array<Object>,
  refreshing: boolean,
  itemsPerRow: number,
}

class HomeScreen extends React.PureComponent<void, Props, void> {
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
    let itemSize = Dimensions.get('window').width / this.props.itemsPerRow

    return (
      <StatusBarPadding style={styles.container}>
        <FlatList
          data={this.props.deals}
          HeaderComponent={this._renderHeader}
          renderItem={({item, index}) => <DealItem
            key={item.id}
            data={item}
            index={index}
            itemSize={itemSize}
            navigation={this.props.navigation}
            renderToHardwareTextureAndroid={true}  /> }
          numColumns={this.props.itemsPerRow}
          keyExtractor={(item: Object, index: number) => item.id}
          onRefresh={this.props.fetchDeals}
          refreshing={this.props.refreshing}
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
