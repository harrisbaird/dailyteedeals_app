import React from 'react'
// import { StyleSheet, View, FlatList } from 'react-native'
import debounce from 'lodash/debounce'
import { connect } from 'react-redux'
// import GridItem from '../components/GridItem'
// import SearchBar from '../components/SearchBar'
// import Spinner from '../components/Spinner'
// import Theme from '../config/theme'
import { fetchSearch } from '../actions'

// const styles: any = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// })

interface Props {
  results: Array<Object>,
  refreshing: boolean,
  fetchSearch: Function
}
interface State {}

// TODO: Filter hidden sites

class SearchScreen extends React.PureComponent<Props, State> {
  fetchSearch: Function

  constructor(props) {
    super(props)
    this.fetchSearch = debounce(this.props.fetchSearch, 250)
  }

  render() {
    return undefined
/*
    return (
      <View style={styles.container}>
        {this.props.refreshing && <Spinner />}

        <SearchBar onChangeText= {query => this.fetchSearch({query})} />
        <FlatList
          data={this.props.results}
          numColumns={Theme.gridItemsPerRow}
          keyExtractor={(item: Object) => item.id}
          shouldItemUpdate={(props, nextProps) => props.item !== nextProps.item}
          renderItem={this._renderItem}
          getItemLayout={(data, index) => ({
            length: Theme.screenWidth / Theme.gridItemsPerRow,
            offset: Theme.screenWidth / Theme.gridItemsPerRow * index,
            index
          })}
        />
      </View>
    )*/
  }

  /*_renderItem = ({item, index}) => {
    let first = item.products[0]
    return (
      <GridItem
        key={item.id}
        title={item.name}
        backgroundColor={first.images.backgroundColor}
        imageURL={first.images.small}
      />
    )
  }*/
}

const mapStateToProps = state => ({
  results: state.search.results,
  refreshing: state.search.refreshing
})

const mapDispatchToProps = dispatch => ({
  fetchSearch: params => dispatch(fetchSearch(params))
})

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(SearchScreen)
