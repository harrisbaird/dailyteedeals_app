import { ARTIST_INVALIDATE } from '../actions'
import { ARTIST } from '../actions'

const initialState = {
  designs: [],
  refreshing: false
}

export default function artistState(state = initialState, action) {
  switch (action.type) {
    case ARTIST_INVALIDATE:
      return {
        ...state,
        designs: []
      }
    case ARTIST.REQUEST:
      return {
        ...state,
        designs: [],
        refreshing: true
      }
    case ARTIST.SUCCESS:
      return {
        ...state,
        designs: action.json.artist.designs,
        refreshing: false
      }
    case ARTIST.FAILURE:
      return {
        ...state,
        message: action.message,
        refreshing: false
      }
    default:
      return state
  }
}
