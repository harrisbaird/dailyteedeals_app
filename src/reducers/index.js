/* @flow */

import { combineReducers } from 'redux'
import deals from './deals'
import settings from './settings'

const rootReducer = combineReducers({
  deals,
  settings,
})

export default rootReducer
