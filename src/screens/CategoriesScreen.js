/* @flow */

import React from 'react'
import { View, Text, StyleSheet, ListView, Dimensions, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import Theme from '../config/theme'
import TabIcon from '../components/TabIcon'
import StatusBarPadding from '../components/StatusBarPadding'
import CategoryRow from '../components/CategoryRow'
import { fetchCategories } from '../actions/requests'

type Props = {
  fetchDeals: Function,
  categories: Array<any>,
  refreshing: boolean,
}

type State = {
  dataSource: ListView.DataSource
}

class CategoriesScreen extends React.Component<void, Props, State> {
  state: State = {
    dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  static navigationOptions = {
    title: "Categories",
    tabBar: {
      icon: ({ tintColor }) => (<TabIcon name='cog' tintColor={tintColor} />),
    },
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    let itemHeight = Dimensions.get('window').width / 3
    let ds = this.state.dataSource.cloneWithRows(this.props.categories)

    return (
      <StatusBarPadding style={styles.container}>
        <ListView
          dataSource={ds}
          renderHeader={this._renderHeader}
          renderRow={(data) => <CategoryRow data={data} itemHeight={itemHeight} />}
          refreshControl={<RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.props.fetchCategories}
            colors={[Theme.colourSpinner()]}
            tintColor={Theme.colourSpinner()} /> } />
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
  },
  container: {
    flex: 1,
    margin: Theme.itemMargin
  },
})

const mapStateToProps = (state) => ({
  categories: state.categories.items,
  refreshing: state.categories.refreshing,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
})

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(CategoriesScreen)
