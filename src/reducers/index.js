/* @flow */

import {combineReducers} from 'redux'
import categories from './categories'
import deals from './deals'
import settings from './settings'
import sites from './sites'

const rootReducer = combineReducers({
  categories,
  deals,
  settings,
  sites
})

export default rootReducer
