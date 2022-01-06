import { useEffect } from 'preact/hooks'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks'
import { getPurchaseIds } from '../store/purchases/selectors'
import { AddPurchase } from './AddPurchase'
import { Purchase } from './Purchase'

export const Purchases = () => {
  const purchaseIds = useAppSelector(getPurchaseIds)
  const dispatch = useDispatch()

  return (
    <div>
      { <AddPurchase /> }
      { purchaseIds.map((id) => <Purchase id={id} />) }
    </div>
  )
}
