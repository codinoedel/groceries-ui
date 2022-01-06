import { useState } from 'preact/hooks'
import { useDispatch } from 'react-redux'
import { addPurchase } from '../store/purchases/actions'

const today = new Date()
const pad = (num: number) => String(num).padStart(2, '0')

const defaults = {
  name: '',
  quantity: 1,
  purchaseDate: `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`,
}

export const AddPurchase = () => {
  const [ name, setName ] = useState(defaults.name)
  const [ quantity, setQuantity ] = useState(defaults.quantity)
  const [ pricePer, setPricePer ]: [ number|undefined, any ] = useState()
  const [ purchaseDate, setPurchaseDate ] = useState(defaults.purchaseDate)
  const dispatch = useDispatch()

  const onSubmit = (ev: Event) => {
    ev.preventDefault()

    console.log('submitting...', { name, quantity, pricePer, purchaseDate })
    dispatch(addPurchase({
      name,
      quantity,
      pricePer: pricePer as number,
      purchaseDate
    }))

    setName(defaults.name)
    setQuantity(defaults.quantity)
    setPricePer()
    setPurchaseDate(defaults.purchaseDate)
  }

  return (
    <div>
      <h3>Add a Purchase</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label for='name'>Name</label>
          <input
            required
            id='name'
            type='text'
            value={name}
            onChange={({ target }) => {
              let input = target as HTMLInputElement
              setName(input.value)
            }}
          />
        </div>
        <div>
          <label for='quantity'>Quantity</label>
          <input
            required
            id='quantity'
            type='number'
            value={quantity}
            onChange={({ target }) => {
              let input = target as HTMLInputElement
              setQuantity(parseInt(input.value))
            }}
          />
        </div>
        <div>
          <label for='pricePer'>Price Per</label>
          <input
            required
            id='pricePer'
            type='number'
            step='0.01'
            value={pricePer}
            onChange={({ target }) => {
              let input = target as HTMLInputElement
              setPricePer(parseFloat(input.value))
            }}
          />
        </div>
        <div>
          <label for='purchaseDate'>Purchased On</label>
          <input
            required
            id='purchaseDate'
            type='date'
            value={purchaseDate}
            onChange={({ target }) => {
              let input = target as HTMLInputElement
              setPurchaseDate(new Date(input.value).toISOString())
            }}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
