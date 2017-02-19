/* @flow */

import Locale from 'react-native-locale'
import * as actions from '../actions'
import { CURRENCIES } from '../constants'


export default function settingsState (state = getInitialState(), action) {
  switch (action.type) {
    case actions.SETTINGS_SET_CURRENCY:
      return {
        ...state,
        currency: action.currency
      }
    case actions.SETTINGS_SET_ITEMS_PER_ROW:
      return {
        ...state,
        itemsPerRow: action.itemsPerRow
      }
    case actions.SETTINGS_SET_GRID_IMAGES_ONLY:
      return {
        ...state,
        gridImagesOnly: action.gridImagesOnly
      }
      case actions.SETTINGS_SET_SITE_HIDDEN:
        let sitesIDs = action.hidden ? [...state.hiddenSites, action.siteID] :
          state.hiddenSites.filter(element => element !== action.siteID)

        // Ensure the array is unique
        return {...state, hiddenSites: Array.from(new Set(sitesIDs))}
    default:
      return state
  }
}

function getInitialState() {
  const validCurrencies = Object.keys(CURRENCIES)
  const deviceCurrency = Locale.constants().currencyCode

  return {
    itemsPerRow: 2,
    hiddenSites: [],
    currency: validCurrencies.includes(deviceCurrency) ? deviceCurrency : 'USD',
    gridImagesOnly: false,
  }
}
