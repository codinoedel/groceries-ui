import update from 'immutability-helper'
import { Action as ReduxAction } from 'redux'
import { Item } from './types'

interface SearchItems extends ReduxAction<'SEARCH_ITEMS'> {
  searchTerm: string
}

interface SearchItemsResponse extends ReduxAction<'SEARCH_ITEMS_RESPONSE'> {
  response: Item[]
}

type Action =
  | SearchItems
  | SearchItemsResponse

export type Search = {
  loadingState: string
  items: Item[]
}

const initialState: Search = {
  loadingState: 'initial',
  items: [],
}

export const searchReducer = (state=initialState, a: Action): Search => {
  switch (a.type) {
    case 'SEARCH_ITEMS':
      return update(state, { $merge: {
        loadingState: 'loading',
        items: []
      }})

    case 'SEARCH_ITEMS_RESPONSE':
      return update(state, { $merge: {
        loadingState: 'loaded',
        items: a.response
      }})

    default:
      return state
  }
}
