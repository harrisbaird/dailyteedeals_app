/* @flow */

import { DEALS, SITES } from './types'

const API_ROOT = 'https://api.dailyteedeals.com/v3'

function requestAction(endpoint, type) {
  let url = `${API_ROOT}/${endpoint}?key=TEST_KEY`

  return dispatch => {
    dispatch({type: type.REQUEST})
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch({type: type.SUCCESS, json: json}))
      .catch(e => dispatch({type: type.FAILURE, error: e}))
  }
}

export const fetchDeals = dispatch => requestAction('deals', DEALS)
export const fetchSites = dispatch => requestAction('sites', SITES)
