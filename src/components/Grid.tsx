import React from 'react'
import {FlatList} from 'react-native'
import * as Theme from '../config/theme'
import {Design, Category} from '../models'

export interface Props {
  data: Array<Object>,
  renderItem: Function,
  header?: Function,
}
export interface State {}

export default class Grid extends React.Component<Props, State> {
  render() {
    return (
      <FlatList
        columnWrapperStyle={{marginBottom: Theme.GRID_MARGIN}}
        data={this.props.data}
        initialNumToRender={50}
        removeClippedSubviews={true}
        numColumns={Theme.GRID_ITEMS_PER_ROW}
        keyExtractor={(item: Design | Category) => item.id}
        shouldItemUpdate={(props, nextProps) => props.item !== nextProps.item}
        renderItem={this._renderItem}
        ListHeaderComponent={this.props.header}
        getItemLayout={(item, index: number) => {
          return {
            length: this.gridItemHeight(),
            offset: this.gridItemHeight() * index,
            index
          }
        }}
      />
    )
  }

  // Add grid item width to item element.
  _renderItem = ({item, index}) => {
    let itemMargin = Theme.GRID_ITEMS_PER_ROW - 1 === index ? 0 : Theme.GRID_MARGIN
    let el = this.props.renderItem({item, index})
    return React.cloneElement(el, {
      itemWidth: this.gridItemWidth(),
      itemMargin: itemMargin
    })
  }

  gridItemWidth = () =>
    Theme.SCREEN_WIDTH / Theme.GRID_ITEMS_PER_ROW -
    (Theme.GRID_ITEMS_PER_ROW - 1) * Theme.GRID_MARGIN / 2

  gridItemHeight = ()  =>
    // Square image height + text box height + bottom margin
    Theme.SCREEN_WIDTH / Theme.GRID_ITEMS_PER_ROW +
    Theme.GRID_ITEM_TEXT_PADDING * 2 +
    Theme.GRID_ITEM_TITLE_LINE_HEIGHT +
    Theme.GRID_ITEM_SUBTITLE_LINE_HEIGHT +
    Theme.GRID_MARGIN
}
