import { combineReducers } from 'redux'

import { playersReducer } from './players/reducer'
import { gameReducer } from './game/reducer'
import { connectionReducer } from './connection/reducer'

export const rootReducer = combineReducers({
  players: playersReducer,
  game: gameReducer,
  connection: connectionReducer,
})
