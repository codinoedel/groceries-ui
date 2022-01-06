import { useAppSelector } from '../hooks'
import { getPurchase } from '../store/purchases/selectors'

interface Props {
  id: string
}

export const Purchase = ({ id }: Props) => {
  const purchase = useAppSelector((state) => getPurchase(state, id))

  return (
    <div>
      Name: { purchase.name }
    </div>
  )
}
