import { useState } from 'preact/hooks'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks'
import { searchItems } from '../store/search/actions'
import { getSearchResults } from '../store/search/selectors'

import type { Item } from '../store/search/types'

import './purchasenameinput.scss'

interface Props {
  className: string
  onSelectName: (name: string) => void
  required: boolean
  value: string
}

export const PurchaseNameInput = ({ className, value, onSelectName, required }: Props) => {
  const dispatch = useDispatch()
  const items = useAppSelector(getSearchResults)
  const [ searchTerm, setSearchTerm ] = useState('')

  const searchOnChange = (ev: Event) => {
    const input = ev.target as HTMLInputElement
    setSearchTerm(input.value)
    dispatch(searchItems(input.value))
  }

  const onSelect = (item: string) => {
    onSelectName(item)
    setSearchTerm('')
  }

  // ensure options are unique
  const options = Array.from(new Set([ searchTerm, ...items ]))

  return (
    <div id='purchase-name-input' class={className}>
      <div id='top'>
        <label for='name'>Name: </label>
        { value
          ? <span id='value'>{value}</span>
          : <span id='value' class='empty'>Enter a name</span>
        }
      </div>
      <input
        value={searchTerm}
        data-form-type='other'
        id='name'
        type='text'
        onChange={searchOnChange}
        autocomplete='off'
        placeholder='Search for an item'
      />
      <div id='options'>
        { searchTerm && options.map((item: Item) => (
          <button onClick={() => onSelect(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
