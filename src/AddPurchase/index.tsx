import { useState } from 'preact/hooks'
import { useDispatch } from 'react-redux'
import { addPurchase } from '../store/purchases/actions'
import { PurchaseNameInput } from './PurchaseNameInput'

import './index.scss'

const today = new Date()
const pad = (num: number) => String(num).padStart(2, '0')
const formatDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`

const defaults = {
  name: '',
  quantity: 1,
  purchaseDate: formatDate(today),
  pricePer: 0,
  store: '',
}

export const AddPurchase = () => {
  const [ name, setName ] = useState(defaults.name)
  const [ quantity, setQuantity ] = useState(defaults.quantity)
  const [ pricePer, setPricePer ]: [ number, any ] = useState(defaults.pricePer)
  const [ purchaseDate, setPurchaseDate ] = useState(defaults.purchaseDate)
  const [ store, setStore ] = useState(defaults.store)

  const dispatch = useDispatch()

  const onSubmit = (ev: Event) => {
    ev.preventDefault()
    console.log('purchase date', purchaseDate)
    console.log('saving...', { name, quantity, store, pricePer, purchaseDate })

    dispatch(addPurchase({
      name,
      quantity,
      store,
      pricePer: pricePer,
      purchaseDate: new Date(purchaseDate).toISOString(),
    }))

    setName(defaults.name)
    setQuantity(defaults.quantity)
    setPricePer(defaults.pricePer)
    console.log('purchase date', purchaseDate)
  }

  return (
    <div class="add-purchase">
      <h3>Add a Purchase</h3>
      <form onSubmit={onSubmit} autocomplete='off'>
        <PurchaseNameInput
          value={name}
          required
          onSelectName={setName}
          className='name'
        />
        <div class='date input'>
          <label for='purchaseDate'>Purchased On</label>
          <input
            required
            id='purchaseDate'
            type='date'
            data-form-type="other"
            value={purchaseDate}
            onChange={({ target }) => {
              let input = target as HTMLInputElement
              setPurchaseDate(input.value)
            }}
          />
        </div>
        <div class='store input'>
          <label for='store'>Store</label>
          <input
            required
            id='store'
            type='text'
            value={store}
            onChange={({ target }) => {
              let input = target as HTMLInputElement
              setStore(input.value)
            }}
          />
        </div>
        <div class='quantity input'>
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
        <div class='priceper input'>
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
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
