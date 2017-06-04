import React from 'react'
import {InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Navigation} from 'react-navigation'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'
import Spinner from '../components/Spinner'
import pluralizeCount from '../utils/pluralizeCount'
import {fetchCategory} from '../actions'

interface Props {
  navigation: Navigation,
  fetchCategory: Function,
  designs: Array<any>,
  refreshing: Boolean
}
interface State {}

class CategoryDesignsScreen extends React.Component<Props, State> {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.categoryName
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.fetchCategory(this.props.navigation.state.params.slug)
    })
  }

  render() {
    if (this.props.refreshing) return <Spinner />

    return <Grid data={this.props.designs} renderItem={this._renderItem} />
  }

  _renderItem = ({item}) => {
    let product = item.products[0]

    return (
      <GridItem
        key={item.id}
        title={item.name}
        subtitle={pluralizeCount(item.products.length, 'site')}
        backgroundColor={product.images.backgroundColor}
        textBackgroundColor={product.images.primaryColor}
        imageURL={product.images.small}
        onPress={() => this.props.navigation.navigate('Design', {design: item})}
      />
    )
  }
}

const mapStateToProps = state => ({
  designs: state.category.designs,
  refreshing: state.category.refreshing
})

const mapDispatchToProps = dispatch => ({
  fetchCategory: slug => dispatch(fetchCategory(slug))
})

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(
  CategoryDesignsScreen
)
