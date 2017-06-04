import {SEARCH} from '../actions'

const initialState = {
  results: [],
  refreshing: false
}

export default function dealsState(state = initialState, action) {
  switch (action.type) {
    case SEARCH.REQUEST:
      return {
        ...state,
        results: [],
        refreshing: true
      }
    case SEARCH.SUCCESS:
      return {
        ...state,
        results: action.json.designs,
        refreshing: false
      }
    case SEARCH.FAILURE:
      console.log(action.error)
      return {
        ...state,
        results: [],
        message: action.message,
        refreshing: false
      }
    default:
      return state
  }
}
