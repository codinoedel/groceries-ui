import update from 'immutability-helper'
import { Action as ReduxAction } from 'redux'
import type { BasePurchase, TotalledPurchase } from './types'

const getTotal = ({ pricePer, quantity }: BasePurchase) => {
  return pricePer * quantity
}
interface AddPurchase extends ReduxAction<'ADD_PURCHASE'> {
  request: BasePurchase
}

interface AddPurchaseResponse extends ReduxAction<'ADD_PURCHASE_RESPONSE'> {
  request: BasePurchase
  status: number
}

type Action =
  | AddPurchase
  | AddPurchaseResponse

export type Purchases = {
  loadingState: string
  purchases: Record<string, TotalledPurchase>
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
          [ new Date().toISOString() ]: {
            ...a.request,
            total: getTotal(a.request),
          }}})
      }})

    default:
      return state
  }
}
