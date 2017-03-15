/* @flow */

import React from 'react'
import {ScrollView, RefreshControl} from 'react-native'
import {connect} from 'react-redux'
import SettingsList from 'react-native-settings-list'
import {fetchSites} from '../actions/requests'
import {setSiteHidden} from '../actions/settings'
import Theme from '../config/theme'

type Props = {
  hiddenSites: Array<number>,
  sites: Array<number>,
  refreshing: boolean,
  fetchSites: Function,
  setSiteHidden: Function
};

class SettingsHiddenSitesScreen extends React.PureComponent<void, Props, void> {
  /**
   * The hidden sites setting screen.
   *
   * Allows toggling of sites, hiding in the deal grid.
   * Performs an http request to load the complete list of sites.
   */

  static navigationOptions = {
    title: 'Hidden Sites'
  };

  componentDidMount() {
    this.props.fetchSites()
  }

  render() {
    let {
      hiddenSites,
      sites,
      refreshing,
      fetchSites,
      setSiteHidden
    } = this.props

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchSites}
            colors={[Theme.colourSpinner()]}
            tintColor={Theme.colourSpinner()}
          />
        }
      >
        <SettingsList
          borderColor={Theme.colourSettingsBorder()}
          useScrollView={false}
        >
          {sites.map((site, index) => (
            <SettingsList.Item
              title={site.name}
              key={site.id}
              hasSwitch={true}
              hasNavArrow={false}
              switchState={hiddenSites.includes(site.id)}
              switchOnValueChange={v => {
                setSiteHidden(site.id, v)
              }}
            />
          ))}
        </SettingsList>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  hiddenSites: state.settings.hiddenSites,
  sites: state.sites.items,
  refreshing: state.sites.refreshing
})

const mapDispatchToProps = dispatch => ({
  fetchSites: () => dispatch(fetchSites()),
  setSiteHidden: (siteID: number, hidden: boolean) =>
    dispatch(setSiteHidden(siteID, hidden))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  SettingsHiddenSitesScreen
)
