import { useAppSelector } from '../hooks'
import { getPurchase } from '../store/purchases/selectors'

import './purchase.scss'

interface Props {
  id: string
}

export const Purchase = ({ id }: Props) => {
  const purchase = useAppSelector((state) => getPurchase(state, id))

  return (
    <div class='purchase'>
      <h4 class='name'>{ purchase.name }</h4>
      <h2 class='total'>{ purchase.total }</h2>
      <div class='qty-price-per'>
        { purchase.quantity } @ {purchase.pricePer}
      </div>
    </div>
  )
}
