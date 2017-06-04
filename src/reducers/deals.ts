import {DEALS} from '../actions'

const initialState = {
  designs: [],
  refreshing: false
}

export default function dealsState(state = initialState, action) {
  switch (action.type) {
    case DEALS.REQUEST:
      return {
        ...state,
        refreshing: true
      }
    case DEALS.SUCCESS:
      return {
        ...state,
        designs: action.json.designs,
        refreshing: false
      }
    case DEALS.FAILURE:
      return {
        ...state,
        message: action.message,
        refreshing: false
      }
    default:
      return state
  }
}
