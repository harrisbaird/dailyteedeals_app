import React from 'react'
import {InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Navigation} from 'react-navigation'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'
import Icon from '../components/Icon'
import Spinner from '../components/Spinner'
import {fetchCategories} from '../actions'

interface Props {
  navigation: Navigation,
  fetchCategories: Function,
  categories: Array<any>,
  refreshing: boolean
}
interface State {}

class CategoriesScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Categories',
    tabBarIcon: ({tintColor}) => (
      <Icon name="grid" color={tintColor} size={20} />
    )
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      console.log(this.props);
      this.props.fetchCategories()
    })
  }

  render() {
    if (this.props.refreshing) return <Spinner />

    return <Grid data={this.props.categories} renderItem={this._renderItem} />
  }

  _renderItem = ({item}) => {
    return (
      <GridItem
        title={item.name}
        subtitle={item.designsCount + ' designs'}
        imageURL={item.images.small}
        backgroundColor={item.images.backgroundColor}
        onPress={() =>
          this.props.navigation.navigate('CategoryDesigns', {
            categoryName: item.name,
            slug: item.slug
          })}
      />
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items,
  refreshing: state.categories.refreshing
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect<{}, Props, State>(mapStateToProps, mapDispatchToProps)(CategoriesScreen)
