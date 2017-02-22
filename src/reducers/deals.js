/* @flow */

import { DEALS } from '../actions/types'

const initialState = {
  items: [],
  refreshing: false,
}

export default function dealsState (state = initialState, action) {
  switch (action.type) {
    case DEALS.REQUEST:
    return {
      ...state,
      refreshing: true,
    }
    case DEALS.SUCCESS:
    return {
      ...state,
      items: action.json.products,
      refreshing: false,
    }
    case DEALS.FAILURE:
    return {
      ...state,
      message: action.message,
      refreshing: false,
    }
    default:
    return state
  }
}
