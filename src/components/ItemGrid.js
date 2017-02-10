/* @flow */

import React from 'react'
import { View, ListView, StyleSheet, Dimensions} from 'react-native'
import _ from 'lodash'

const { width } = Dimensions.get('window');

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

export default class ItemGrid extends React.Component {
  props: Props;
  defaultProps: DefaultProps;
  state: State;

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    itemsPerRow: React.PropTypes.number.isRequired,
    renderItem: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    itemsPerRow: 3,
  }

  constructor(props: Object) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this._setupData(this.props.data)),
    };
  }

  componentWillReceiveProps(nextProps: Object) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._setupData(nextProps.data)),
    });
  }

  _setupData(data: Array<any>) {
    const rows = _.chunk(data, this.props.itemsPerRow);

    // Ensure the last row contains the correct number of items by adding
    // a placeholder.
    if (rows.length) {
      const lastRow = _.last(rows)
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
