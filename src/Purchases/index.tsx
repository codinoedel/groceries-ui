import { useEffect } from 'preact/hooks'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks'
import { getPurchaseIds } from '../store/purchases/selectors'
import { Purchase } from './Purchase'

import './index.scss'

export const Purchases = () => {
  const purchaseIds = useAppSelector(getPurchaseIds)
  const dispatch = useDispatch()

  return (
    <div>
      <h3>Purchases</h3>
      <div class='purchases'>
        {purchaseIds.map((id) => <Purchase id={id} />)}
      </div>
    </div>
  )
}
