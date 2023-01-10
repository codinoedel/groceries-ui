interface BuyNGetN {
  buy: number
  get: number
  type: 'buyNGetN'
}

interface Discount {
  amount: number
  type: 'discount'
}

export type Savings = BuyNGetN | Discount

export interface BasePurchase {
  name: string
  pricePer: number
  quantity: number
  purchaseDate: string
  savings?: Savings
  store: string
}

export interface TotalledPurchase extends BasePurchase {
  total: number
}
