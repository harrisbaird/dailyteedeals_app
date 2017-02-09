/* @flow */

import React, { Component } from 'react';
import { StyleSheet, View, ListView, Dimensions, Easing} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { GRID_ANIMATION_DELAY, ITEMS_PER_ROW, ITEM_MARGIN, DEAL_URL, COLOUR_HEADER_BG, COLOUR_HEADER_TEXT } from '../constants'
import ItemGrid from '../components/ItemGrid';
import AnimatedGridItem from '../components/AnimatedGridItem';
import DealItem from '../components/DealItem';
import TouchableItem from '../components/TouchableItem';

type Props = {
  navigation: StackNavigator
};

type State = {
  products: Array<any>,
  itemWidth: number,
};

export default class HomeScreen extends Component {
  props: Props;
  state: State;

  static navigationOptions = {
    title: 'Daily Tee Deals',
    header: {
      style: { backgroundColor : COLOUR_HEADER_BG },
      tintColor: COLOUR_HEADER_TEXT
    },
  }

  constructor(props: Object) {
    super(props);

    // Calculate item width and margins
    let deviceWidth = Dimensions.get('window').width;
    let totalMargin = ITEM_MARGIN * (ITEMS_PER_ROW - ITEM_MARGIN);
    let itemWidth = Math.floor((deviceWidth - totalMargin) / ITEMS_PER_ROW);

    this.state = {
      products: [],
      itemWidth: itemWidth,
    };
  }

  componentDidMount() {
    this._fetchDeals()
  }

  render() {
    const { navigate } = this.props.navigation

    return <ItemGrid
      data={this.state.products}
      itemsPerRow={ITEMS_PER_ROW}
      renderItem={this._renderItem.bind(this)}
    />
  }

  _renderItem(data: Object, row: number, col: number) {
    const { itemWidth } = this.state

    return (
      <View key={data.id} style={styles.itemContainer}>
        <TouchableItem onPress={this._showDetail.bind(this, data)}>
          <AnimatedGridItem
            width={itemWidth}
            height={itemWidth}
            row={row}
            col={col}
            backgroundColor={data.images.background_color}
            animDelay={this._staggeredAnimDelay}
            animEasing={Easing.out(Easing.quad)}>
            <DealItem data={data} itemWidth={itemWidth} />
          </AnimatedGridItem>
        </TouchableItem>
      </View>
    )
  }

  // Animate the grid items so that they appear from top left
  // to bottom right.
  // +---+---+---+
  // | 1 | 2 | 3 |
  // +---+---+---+
  // | 2 | 3 | 4 |
  // +---+---+---+
  // | 3 | 4 | 5 |
  // +---+---+---+
  _staggeredAnimDelay(row: number, col: number) {
    return (row + col) * GRID_ANIMATION_DELAY;
  }

  _showDetail(data) {
    const { navigate } = this.props.navigation
    navigate('Detail', { product: data, title: data.design.name })
  }

  _fetchDeals() {
    fetch(DEAL_URL)
    .then( response => response.json() )
    .then( jsonData => {
      this.setState({products: jsonData.products});
    })
    .catch( error => console.log('Error fetching: ' + error) );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: ITEM_MARGIN,
  }
});
