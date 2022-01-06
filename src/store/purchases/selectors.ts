import type { AppState } from '../'

import type { Purchase } from './types'

export const getPurchases = (state: AppState): Purchase[] => (
  Object.values(state.purchases.purchases)
)

export const getPurchaseIds = (state: AppState): string[] => (
  Object.keys(state.purchases.purchases)
)

export const getPurchase = (state: AppState, id: string): Purchase => (
  state.purchases.purchases[id]
)
