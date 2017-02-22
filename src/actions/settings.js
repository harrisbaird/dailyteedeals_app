/* @flow */

import * as types from './types'

function action(type, payload = {}) {
  return {type, ...payload}
}

export const setItemsPerRow = itemsPerRow =>
  action(types.SETTINGS_SET_ITEMS_PER_ROW, {itemsPerRow})

export const setCurrency = currency =>
  action(types.SETTINGS_SET_CURRENCY, {currency})

export const setGridImagesOnly = gridImagesOnly =>
  action(types.SETTINGS_SET_GRID_IMAGES_ONLY, {gridImagesOnly})

export const setSiteHidden = (siteID, hidden) =>
  action(types.SETTINGS_SET_SITE_HIDDEN, {siteID, hidden})
