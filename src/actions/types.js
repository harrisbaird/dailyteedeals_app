/* @flow */

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const CATEGORIES = createRequestTypes('CATEGORIES')
export const DEALS = createRequestTypes('DEALS')
export const SITES = createRequestTypes('SITES')

export const SETTINGS_SET_ITEMS_PER_ROW = 'SETTINGS_SET_ITEMS_PER_ROW'
export const SETTINGS_SET_CURRENCY = 'SETTINGS_SET_CURRENCY'
export const SETTINGS_SET_GRID_IMAGES_ONLY = 'SETTINGS_SET_GRID_IMAGES_ONLY'
export const SETTINGS_SET_SITE_HIDDEN = 'SETTINGS_SET_SITE_HIDDEN'
