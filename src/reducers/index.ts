import {combineReducers} from 'redux'
import artist from './artist'
import categories from './categories'
import category from './category'
import deals from './deals'
import search from './search'
import settings from './settings'
import sites from './sites'

const rootReducer = combineReducers({
  artist,
  categories,
  category,
  deals,
  search,
  settings,
  sites
})

export default rootReducer
