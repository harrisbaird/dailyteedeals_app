import React from 'react'
import { connect } from 'react-redux'
import { Navigation } from 'react-navigation'
// import Grid from '../components/Grid'
import Icon from '../components/Icon'
import NoFavorites from '../components/NoFavorites'

interface Props {
  navigation: Navigation
}
interface State {}

class FavoritesScreen extends React.PureComponent<Props, State> {
  static navigationOptions = {
    title: 'Favorites',
    tabBarIcon: ({tintColor}) => (
      <Icon name="heart" color={tintColor} size={20} />
    )
  }

  render() {
    // if (this.props.favoriteDesignIds.length == 0)
    return <NoFavorites />

    // return undefined
    // return (
    //   <Grid data={this.props.favoriteDesignIds} renderItem={this._renderItem} />
    // )
  }

  // _renderItem({item}) {
  //   return undefined
  // }
}

const mapStateToProps = state => ({
  favoriteDesignIds: state.settings.favoriteDesignIds
})

export default connect<any, any, any>(mapStateToProps)(FavoritesScreen)
