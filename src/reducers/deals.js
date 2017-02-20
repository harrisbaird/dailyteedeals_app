/* @flow */

import { DEALS } from '../actions'

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
      items: action.response.products,
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
