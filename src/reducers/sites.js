/* @flow */

import { SITES } from '../actions'

const initialState = {
  items: [],
  refreshing: false,
}

export default function sitesState (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case SITES.REQUEST:
    return {
      ...state,
      refreshing: true,
    }
    case SITES.SUCCESS:
    return {
      ...state,
      items: action.response.sites,
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
