/* @flow */

import secrets from '../../secrets.json'

const API_ROOT = 'https://api.dailyteedeals.com/v3'

export const DEALS_FETCH_REQUEST = 'DEALS_FETCH_REQUEST'
export const DEALS_FETCH_SUCCESS = 'DEALS_FETCH_SUCCESS'
export const DEALS_FETCH_FAILED = 'DEALS_FETCH_FAILED'

export const SETTINGS_SET_ITEMS_PER_ROW = 'SETTINGS_SET_ITEMS_PER_ROW'
export const SETTINGS_SET_CURRENCY = 'SETTINGS_SET_CURRENCY'
export const SETTINGS_SET_GRID_IMAGES_ONLY = 'SETTINGS_SET_GRID_IMAGES_ONLY'

function requestDeals () {
  return {
    type: DEALS_FETCH_REQUEST
  }
}

function receiveDeals (json) {
  return {
    type: DEALS_FETCH_SUCCESS,
    items: json.products
  }
}

export const setItemsPerRow = (value) => ({
  type: SETTINGS_SET_ITEMS_PER_ROW,
  itemsPerRow: value
})

export const setCurrency = (value) => ({
  type: SETTINGS_SET_CURRENCY,
  currency: value
})

export const setGridImagesOnly = (value) => ({
  type: SETTINGS_SET_GRID_IMAGES_ONLY,
  gridImagesOnly: value
})

export function fetchDeals () {
  url = `${API_ROOT}/deals?key=${secrets.apiKey}`

  return dispatch => {
    dispatch(requestDeals())
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveDeals(json)))
  }
}
