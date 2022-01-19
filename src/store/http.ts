import { Middleware } from 'redux'

import type { AppState } from './'
import type { Purchase } from './purchases/types'

const url = (path: string) => `http://192.168.1.2:3030${path}`
const options = (overrides: RequestInit) => ({
  mode: 'cors' as RequestMode,
  ...overrides,
})

export const send: Middleware<{}, AppState> = ({ dispatch, getState }) => next => action => {
  switch(action.type) {
    case 'ADD_PURCHASE':
      fetch(url('/purchase'), options({
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(action.request)
      }))

      .then((response) => {
        dispatch({
          type: 'ADD_PURCHASE_RESPONSE',
          request: action.request,
          response,
        })
      })

      break

    case 'SEARCH_ITEMS':
      fetch(url(`/items?search=${action.searchTerm}`), options({ method: 'GET' }))
      .then((response) => response.json().then((json) => {
        console.log('json', json)
        dispatch({
          type: 'SEARCH_ITEMS_RESPONSE',
          request: action.searchTerm,
          response: json,
        })
      }))

      break
  }

  return next(action)
}
