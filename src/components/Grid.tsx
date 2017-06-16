import React from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import * as Theme from '../config/theme'
import { Design, Category } from '../models'

export interface Props {
  data: Array<Object>,
  renderItem: Function,
  itemsPerRow: number,
  header?: Function,
}
export interface State { }

class Grid extends React.Component<Props, State> {
  render() {
    return (
      <FlatList
        columnWrapperStyle={{ marginBottom: Theme.GRID_MARGIN }}
        data={this.props.data}
        initialNumToRender={8}
        removeClippedSubviews={true}
        numColumns={this.props.itemsPerRow}
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
  _renderItem = ({ item, index }) => {
    let itemMargin = this.props.itemsPerRow - 1 === index ? 0 : Theme.GRID_MARGIN
    let el = this.props.renderItem({ item, index })
    return React.cloneElement(el, {
      itemWidth: this.gridItemWidth(),
      itemMargin: itemMargin
    })
  }

  gridItemWidth = () =>
    Theme.SCREEN_WIDTH / this.props.itemsPerRow -
    (this.props.itemsPerRow - 1) * Theme.GRID_MARGIN / 2

  gridItemHeight = () =>
    // Square image height + text box height + bottom margin
    Theme.SCREEN_WIDTH / this.props.itemsPerRow +
    Theme.GRID_ITEM_TEXT_PADDING * 2 +
    Theme.GRID_ITEM_TITLE_LINE_HEIGHT +
    Theme.GRID_ITEM_SUBTITLE_LINE_HEIGHT +
    Theme.GRID_MARGIN
}

const mapStateToProps = state => ({
  itemsPerRow: state.settings.itemsPerRow,
})

export default connect<any, any, any>(mapStateToProps)(Grid)
