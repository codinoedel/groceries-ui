import { Middleware } from 'redux'

import type { AppState } from './'
import type { Purchase } from './purchases/types'

const url = (path: string) => `http://192.168.1.2:3030${path}`
const options = (overrides: RequestInit) => ({
  mode: 'cors' as RequestMode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://192.168.1.2:3030',
  },
  ...overrides,
})

export const send: Middleware<{}, AppState> = ({ dispatch, getState }) => next => action => {
  switch(action.type) {
    case 'ADD_PURCHASE':
      fetch(url('/purchase'), options({
        method: 'POST',
        body: action.request
      }))

      .then((response) => {
        dispatch({
          type: 'FETCH_PURCHASES_RESPONSE',
          request: action.request,
          response,
        })
      })

      break
  }

  return next(action)
}
