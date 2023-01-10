import type { BasePurchase } from './types'

export const addPurchase = (purchase: BasePurchase) => ({
  type: 'ADD_PURCHASE',
  request: purchase,
})
