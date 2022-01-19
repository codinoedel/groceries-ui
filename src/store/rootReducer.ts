import { combineReducers } from 'redux'

import { purchasesReducer } from './purchases/reducer'
import { searchReducer } from './search/reducer'

export const rootReducer = combineReducers({
  purchases: purchasesReducer,
  search: searchReducer,
})
