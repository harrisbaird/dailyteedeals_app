/* @flow */

import * as actions from '../actions'
import Locale from 'react-native-locale'
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
    default:
      return state
  }
}

function getInitialState() {
  const validCurrencies = Object.keys(CURRENCIES)
  const deviceCurrency = Locale.constants().currencyCode

  return {
    itemsPerRow: 2,
    currency: validCurrencies.includes(deviceCurrency) ? deviceCurrency : 'USD',
  }
}
