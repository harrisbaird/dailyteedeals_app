/* @flow */

import * as actions from '../actions'

const initialState = {
  items: [],
  loading: false,
}

export default function dealsState (state = initialState, action) {
  switch (action.type) {
    case actions.DEALS_FETCH_REQUEST:
    return {
      ...state,
      loading: true,
    }
    case actions.DEALS_FETCH_SUCCESS:
      return {
        ...state,
        items: action.items,
      loading: false,
      }
    case actions.DEALS_FETCH_FAILED:
      return {
        ...state,
        message: action.message,
        loading: false,
      }
    default:
      return state
  }
}
