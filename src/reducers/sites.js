/* @flow */

import * as actions from '../actions'

const initialState = {
  items: [],
  refreshing: false,
}

export default function sitesState (state = initialState, action) {
  switch (action.type) {
    case actions.SITES_FETCH_REQUEST:
    return {
      ...state,
      refreshing: true,
    }
    case actions.SITES_FETCH_SUCCESS:
    return {
      ...state,
      items: action.items,
      refreshing: false,
    }
    case actions.SITES_FETCH_FAILED:
    return {
      ...state,
      message: action.message,
      refreshing: false,
    }
    default:
    return state
  }
}
