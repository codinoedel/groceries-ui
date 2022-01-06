import type { Purchase } from './types'

export const addPurchase = (purchase: Purchase) => ({
  type: 'ADD_PURCHASE',
  request: purchase,
})
