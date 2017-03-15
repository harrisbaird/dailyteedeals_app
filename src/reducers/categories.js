/* @flow */

import {CATEGORIES} from '../actions/types'

const initialState = {
  items: [],
  refreshing: false
}

export default function categoriesState(state = initialState, action) {
  switch (action.type) {
    case CATEGORIES.REQUEST:
      return {
        ...state,
        refreshing: true
      }
    case CATEGORIES.SUCCESS:
      return {
        ...state,
        items: action.json.categories,
        refreshing: false
      }
    case CATEGORIES.FAILURE:
      return {
        ...state,
        message: action.message,
        refreshing: false
      }
    default:
      return state
  }
}
