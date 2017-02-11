/* @flow */

import * as actions from '../actions'

const initialState = {
  itemsPerRow: 3,
  currency: 'USD',
}

export default function settingsState(state = initialState, action) {
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
