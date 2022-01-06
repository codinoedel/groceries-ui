import update from 'immutability-helper'
import { Action as ReduxAction } from 'redux'
import type { Purchase } from './types'

interface AddPurchase extends ReduxAction<'ADD_PURCHASE'> {
  request: Purchase
}

interface AddPurchaseResponse extends ReduxAction<'ADD_PURCHASE_RESPONSE'> {
  request: Purchase
  status: number
}

type Action =
  | AddPurchase
  | AddPurchaseResponse

export type Purchases = {
  loadingState: string
  purchases: Record<string, Purchase>
}

const initialState: Purchases = {
  loadingState: 'initial',
  purchases: {},
}

export const purchasesReducer = (state=initialState, a: Action): Purchases => {
  switch (a.type) {
    case 'ADD_PURCHASE':
      return update(state, { $merge: {
        purchases: update(state.purchases, { $merge: {
          [ new Date().toISOString() ]: a.request,
        }})
      }})

    default:
      return state
  }
}
