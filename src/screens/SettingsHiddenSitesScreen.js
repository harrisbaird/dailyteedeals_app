/* @flow */

import React from 'react';
import { ScrollView, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import SettingsList from 'react-native-settings-list'
import { fetchSites } from '../actions/requests'
import { setSiteHidden } from '../actions/settings'
import { COLOUR_SPINNER, COLOUR_SETTINGS_BORDER } from '../config/theme'

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

  static navigationOptions = {
    title: 'Hidden Sites',
  }

  componentDidMount() {
    this.props.fetchSites()
  }


  render() {
    let { hiddenSites, sites, refreshing, fetchSites, setSiteHidden } = this.props

    return (
      <ScrollView
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={fetchSites}
          colors={[COLOUR_SPINNER]}
          tintColor={COLOUR_SPINNER} />}>
        <SettingsList
          borderColor={COLOUR_SETTINGS_BORDER}
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

const mapStateToProps = (state) => ({
  hiddenSites: state.settings.hiddenSites,
  sites: state.sites.items,
  refreshing: state.sites.refreshing,
})

const mapDispatchToProps = (dispatch) => ({
  fetchSites: () => dispatch(fetchSites()),
  setSiteHidden: (siteID: number, hidden: boolean) =>
    dispatch(setSiteHidden(siteID, hidden)),
})

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(SettingsHiddenSitesScreen)
