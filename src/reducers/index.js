/* @flow */

import { combineReducers } from 'redux'
import deals from './deals'
import settings from './settings'
import sites from './sites'

const rootReducer = combineReducers({
  deals,
  settings,
  sites,
})

export default rootReducer
