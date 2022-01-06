import { combineReducers } from 'redux'

import { purchasesReducer } from './purchases/reducer'
// import { connectionReducer } from './connection/reducer'

export const rootReducer = combineReducers({
  purchases: purchasesReducer,
  // connection: connectionReducer,
})
