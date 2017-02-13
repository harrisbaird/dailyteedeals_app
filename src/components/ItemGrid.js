/* @flow */

import React from 'react'
import { View, ListView, StyleSheet, Dimensions} from 'react-native'

const { width } = Dimensions.get('window');

function chunk(arr, n) {
    return Array.from(Array(Math.ceil(arr.length/n)), (_,i)=>arr.slice(i*n,i*n+n));
}

type Props = {
  data: Array<any>,
  itemsPerRow: number,
  renderItem: Function,
};

type DefaultProps = {
  itemsPerRow: number
};

type State = {
  dataSource: ListView.DataSource
};

export default class ItemGrid extends React.Component<DefaultProps, Props, State> {
  state: State = {
    dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  static defaultProps = {
    itemsPerRow: 3,
  }

  componentWillReceiveProps(nextProps: Object) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._setupData(nextProps.data)),
    });
  }

  _setupData(data: Array<any>) {
    const rows = chunk(data, this.props.itemsPerRow);

    // Ensure the last row contains the correct number of items by adding
    // a placeholder.
    if (rows.length) {
      const lastRow = rows.slice(-1)[0]
      let wantItems = this.props.itemsPerRow - lastRow.length
      lastRow.push(...Array(wantItems).fill(null))
    }

    return rows
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections
        />
      </View>
    );
  }

  _renderRow(rowData: Array<any>, sectionID: number, rowID: number) {
    return (
      <View style={styles.row}>
        {rowData.map((data, col) => {
          if(data != null) {
            return this.props.renderItem(data, parseInt(rowID), col);
          } else {
            // Fill the last row
            return <View key={col} style={{width: width / this.props.itemsPerRow}}/>
          }
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flex: 1,
  },
});
