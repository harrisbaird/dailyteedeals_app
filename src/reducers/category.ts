import {CATEGORY} from '../actions'

const initialState = {
  designs: [],
  refreshing: false
}

export default function categoryState(state = initialState, action) {
  switch (action.type) {
    case CATEGORY.REQUEST:
      return {
        ...state,
        designs: [],
        refreshing: true
      }
    case CATEGORY.SUCCESS:
      return {
        ...state,
        designs: action.json.designs,
        refreshing: false
      }
    case CATEGORY.FAILURE:
      return {
        ...state,
        message: action.message,
        refreshing: false
      }
    default:
      return state
  }
}
