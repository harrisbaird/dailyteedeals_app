/* @flow */

import React from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import SettingsList from 'react-native-settings-list'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as actions from '../actions'
import { CURRENCIES, COLOUR_MISC, COLOUR_SPINNER } from '../constants'

type Props = {
  hiddenSites: Array<number>,
  sites: Array<number>,
  refreshing: boolean,
  fetchSites: Function,
  setSiteHidden: Function,
}


class SettingsHiddenSitesScreen extends React.Component<void, Props, void> {
  /**
   * The hidden sites setting screen.
   *
   * Allows toggling of sites, hiding in the deal grid.
   * Performs an http request to load the complete list of sites.
   */

  componentDidMount() {
    this.props.fetchSites()
  }


  render() {
    let { hiddenSites, sites, refreshing, setSiteHidden } = this.props

    return (
      <ScrollView
        refreshControl={<RefreshControl
          refreshing={this.props.refreshing}
          onRefresh={this.props.fetchSites}
          colors={[COLOUR_SPINNER]}
          tintColor={COLOUR_SPINNER} />}>
        <SettingsList
          borderColor='#c8c7cc'
          useScrollView={false}>
          {sites.map((site, index) =>
            <SettingsList.Item
              title={site.name}
              key={site.id}
              hasSwitch={true}
              hasNavArrow={false}
              switchState={hiddenSites.includes(site.id)}
              switchOnValueChange={(v) => {
                setSiteHidden(site.id, v)
              }} />
          )}
        </SettingsList>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


const mapStateToProps = (state) => ({
  hiddenSites: state.settings.hiddenSites,
  sites: state.sites.items,
  refreshing: state.sites.refreshing,
})

const mapDispatchToProps = (dispatch) => ({
  fetchSites: () => dispatch(actions.fetchSites()),
  setSiteHidden: (siteID: number, hidden: boolean) =>
    dispatch(actions.setSiteHidden(siteID, hidden)),
})

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(SettingsHiddenSitesScreen)
