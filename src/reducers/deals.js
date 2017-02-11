/* @flow */

import * as actions from '../actions'

const initialState = {
  items: []
}

export default function dealsState(state = initialState, action) {
  switch (action.type) {
  case actions.DEALS_FETCH_SUCCESS:
    return {
      ...state,
      items: action.items
    }
  case actions.DEALS_FETCH_FAILED:
    return {
      ...state,
      message: action.message
    }
  default:
    return state
  }
}
