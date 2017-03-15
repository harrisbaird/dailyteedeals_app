/* @flow */

import React from 'react'
import {StackNavigator} from 'react-navigation'
import {connect} from 'react-redux'
import FlatList from 'react-native/Libraries/CustomComponents/Lists/FlatList'
import DealDetail from '../components/DealDetail'

type Props = {
  navigation: StackNavigator,
  deals: Array<Object>
};

class DetailScreen extends React.PureComponent<void, Props, void> {
  render() {
    let index = this.props.navigation.state.params.index
    let {deals} = this.props

    return (
      <FlatList
        data={deals}
        horizontal={true}
        debug={true}
        windowSize={4}
        pagingEnabled={true}
        renderItem={({item}) => (
          <DealDetail
            key={item.id}
            deal={item}
            navigation={this.props.navigation}
          />
        )}
        keyExtractor={(item: Object, index: number) => item.id}
      />
    )
  }
}

const mapStateToProps = state => ({
  deals: state.deals.items
})

export default connect(mapStateToProps)(DetailScreen)
