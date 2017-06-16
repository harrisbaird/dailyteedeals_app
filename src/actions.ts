import QueryString from 'query-string'

const API_ROOT = 'https://api.dailyteedeals.com/v4'
const API_KEY = 'TEST_KEY'

const REQUEST: string = 'REQUEST'
const SUCCESS: string = 'SUCCESS'
const FAILURE: string = 'FAILURE'

export const ARTIST = createRequestTypes('ARTIST')
export const CATEGORY = createRequestTypes('CATEGORY')
export const CATEGORIES = createRequestTypes('CATEGORIES')
export const DEALS = createRequestTypes('DEALS')
export const SITES = createRequestTypes('SITES')
export const SEARCH = createRequestTypes('SEARCH')

export const ARTIST_INVALIDATE = 'ARTIST_INVALIDATE'
export const SETTINGS_SET_ITEMS_PER_ROW = 'SETTINGS_SET_ITEMS_PER_ROW'
export const SETTINGS_SET_CURRENCY = 'SETTINGS_SET_CURRENCY'
export const SETTINGS_SET_DEFAULT_ORDER = 'SETTINGS_SET_DEFAULT_ORDER'
export const SETTINGS_TOGGLE_SITE_HIDDEN = 'SETTINGS_TOGGLE_SITE_HIDDEN'
export const SETTINGS_TOGGLE_FAVORITE = 'SETTINGS_TOGGLE_FAVORITE'

function action(type, payload = {}) {
  return { type, ...payload }
}

interface RequestType {
  REQUEST: string,
  SUCCESS: string,
  FAILURE: string
}

function requestAction(endpoint: string, type: RequestType, params: { [key: string]: string }) {
  params.key = API_KEY
  let url = `${API_ROOT}/${endpoint}?${QueryString.stringify(params)}`
  return dispatch => {
    dispatch({ type: type.REQUEST })
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch({ type: type.SUCCESS, json: json }))
      .catch(e => dispatch({ type: type.FAILURE, error: e }))
  }
}

function createRequestTypes(base): RequestType {
  return <RequestType>{
    REQUEST: base + '_' + REQUEST,
    SUCCESS: base + '_' + SUCCESS,
    FAILURE: base + '_' + FAILURE,
  }
}

export const fetchArtist = slug =>
  requestAction('artists/' + slug, ARTIST, {})
export const fetchCategory = slug =>
  requestAction('categories/' + slug, CATEGORY, {})
export const fetchCategories = () =>
  requestAction('categories', CATEGORIES, {})
export const fetchDeals = () =>
  requestAction('deals', DEALS, {})
export const fetchSites = () =>
  requestAction('sites', SITES, {})
export const fetchSearch = params =>
  requestAction('search', SEARCH, params)

export const invalidateArtist = (slug) =>
  action(ARTIST_INVALIDATE, { slug })

export const setItemsPerRow = (size: number) =>
  action(SETTINGS_SET_ITEMS_PER_ROW, { size })
export const setCurrency = (currency: string) =>
  action(SETTINGS_SET_CURRENCY, { currency })
export const setDefaultOrder = (order: string) =>
  action(SETTINGS_SET_DEFAULT_ORDER, { order })
export const toggleSiteHidden = (siteID: number) =>
  action(SETTINGS_TOGGLE_SITE_HIDDEN, { siteID })
export const toggleFavorite = (designID: number) =>
  action(SETTINGS_TOGGLE_FAVORITE, { designID })
