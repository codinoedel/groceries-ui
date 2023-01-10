import type { AppState } from '../'

import type { TotalledPurchase } from './types'

export const getPurchases = (state: AppState): TotalledPurchase[] => (
  Object.values(state.purchases.purchases)
)

export const getPurchaseIds = (state: AppState): string[] => (
  Object.keys(state.purchases.purchases)
)

export const getPurchase = (state: AppState, id: string): TotalledPurchase => (
  state.purchases.purchases[id]
)
