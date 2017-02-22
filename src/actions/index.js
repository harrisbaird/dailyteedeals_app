/* @flow */

import secrets from '../../secrets.json'
import { API_ROOT } from '../constants'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const DEALS = createRequestTypes('DEALS')
export const SITES = createRequestTypes('SITES')

export const SETTINGS_SET_ITEMS_PER_ROW = 'SETTINGS_SET_ITEMS_PER_ROW'
export const SETTINGS_SET_CURRENCY = 'SETTINGS_SET_CURRENCY'
export const SETTINGS_SET_GRID_IMAGES_ONLY = 'SETTINGS_SET_GRID_IMAGES_ONLY'
export const SETTINGS_SET_SITE_HIDDEN = 'SETTINGS_SET_SITE_HIDDEN'

function action(type, payload = {}) {
  return {type, ...payload}
}

export const deals = {
  request: () => action(DEALS.REQUEST),
  success: (response) => action(DEALS.SUCCESS, {response}),
  failure: (response, error) => action(DEALS.FAILURE, {response, error}),
}

export const sites = {
  request: () => action(SITES.REQUEST),
  success: (response) => action(SITES.SUCCESS, {response}),
  failure: (response, error) => action(SITES.FAILURE, {response, error}),
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
    dispatch(deals.request())
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(deals.success(json)))
  }
}

export function fetchSites() {
  url = `${API_ROOT}/sites?key=${secrets.apiKey}`

  return dispatch => {
    dispatch(sites.request())
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(sites.success(json)))
  }
}
