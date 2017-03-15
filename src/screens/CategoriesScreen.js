/* @flow */

import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import FlatList from 'react-native/Libraries/CustomComponents/Lists/FlatList'
import {connect} from 'react-redux'
import Theme from '../config/theme'
import TabIcon from '../components/TabIcon'
import CategoryItem from '../components/CategoryItem'
import {fetchCategories} from '../actions/requests'

type Props = {
  fetchDeals: Function,
  categories: Array<any>,
  refreshing: boolean
};

class CategoriesScreen extends React.Component<void, Props, void> {
  static navigationOptions = {
    title: 'Categories',
    tabBar: {
      icon: ({tintColor}) => <TabIcon name="cog" tintColor={tintColor} />
    }
  };

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    let itemSize = Dimensions.get('window').width / this.props.itemsPerRow

    return (
      <FlatList
        data={this.props.categories}
        HeaderComponent={this._renderHeader}
        renderItem={({item}) => (
          <CategoryItem data={item} itemSize={itemSize} />
        )}
        numColumns={this.props.itemsPerRow}
        keyExtractor={(item: Object, index: number) => item.id}
        onRefresh={this.props.fetchCategories}
        refreshing={this.props.refreshing}
      />
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

const mapStateToProps = state => ({
  itemsPerRow: state.settings.itemsPerRow,
  categories: state.categories.items,
  refreshing: state.categories.refreshing
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen)
