/* @flow */

import { SITES } from '../actions/types'

const initialState = {
  items: [],
  refreshing: false,
}

export default function sitesState (state = initialState, action) {
  switch (action.type) {
    case SITES.REQUEST:
    return {
      ...state,
      refreshing: true,
    }
    case SITES.SUCCESS:
    return {
      ...state,
      items: action.json.sites,
      refreshing: false,
    }
    case SITES.FAILURE:
    return {
      ...state,
      message: action.message,
      refreshing: false,
    }
    default:
    return state
  }
}
