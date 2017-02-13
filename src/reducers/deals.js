/* @flow */

import * as actions from '../actions'

const initialState = {
  items: [],
  refreshing: false,
}

export default function dealsState (state = initialState, action) {
  switch (action.type) {
    case actions.DEALS_FETCH_REQUEST:
    return {
      ...state,
      refreshing: true,
    }
    case actions.DEALS_FETCH_SUCCESS:
    return {
      ...state,
      items: action.items,
      refreshing: false,
    }
    case actions.DEALS_FETCH_FAILED:
    return {
      ...state,
      message: action.message,
      refreshing: false,
    }
    default:
    return state
  }
}
