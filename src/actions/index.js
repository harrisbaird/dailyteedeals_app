/* @flow */

import secrets from '../../secrets.json'

const API_ROOT = 'https://api.dailyteedeals.com/v3'

export const DEALS_FETCH_REQUEST = 'DEALS_FETCH_REQUEST'
export const DEALS_FETCH_SUCCESS = 'DEALS_FETCH_SUCCESS'
export const DEALS_FETCH_FAILED = 'DEALS_FETCH_FAILED'

export const SITES_FETCH_REQUEST = 'SITES_FETCH_REQUEST'
export const SITES_FETCH_SUCCESS = 'SITES_FETCH_SUCCESS'
export const SITES_FETCH_FAILED = 'SITES_FETCH_FAILED'

export const SETTINGS_SET_ITEMS_PER_ROW = 'SETTINGS_SET_ITEMS_PER_ROW'
export const SETTINGS_SET_CURRENCY = 'SETTINGS_SET_CURRENCY'
export const SETTINGS_SET_GRID_IMAGES_ONLY = 'SETTINGS_SET_GRID_IMAGES_ONLY'
export const SETTINGS_SET_SITE_HIDDEN = 'SETTINGS_SET_SITE_HIDDEN'

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

function requestSites () {
  return {
    type: SITES_FETCH_REQUEST
  }
}

function receiveSites (json) {
  return {
    type: SITES_FETCH_SUCCESS,
    items: json.sites
  }
}

export const setItemsPerRow = (value: number) => ({
  type: SETTINGS_SET_ITEMS_PER_ROW,
  itemsPerRow: value
})

export const setCurrency = (value: string) => ({
  type: SETTINGS_SET_CURRENCY,
  currency: value
})

export const setGridImagesOnly = (enabled: boolean) => ({
  type: SETTINGS_SET_GRID_IMAGES_ONLY,
  gridImagesOnly: enabled
})

export const setSiteHidden = (siteID: number, hidden: boolean) => {
  console.log(siteID, hidden);

  return{
  type: SETTINGS_SET_SITE_HIDDEN,
  siteID: siteID,
  hidden: hidden,
}}

export function fetchDeals () {
  url = `${API_ROOT}/deals?key=${secrets.apiKey}`

  return dispatch => {
    dispatch(requestDeals())
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveDeals(json)))
  }
}

export function fetchSites() {
  url = `${API_ROOT}/sites?key=${secrets.apiKey}`

  return dispatch => {
    dispatch(requestSites())
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveSites(json)))
  }
}
