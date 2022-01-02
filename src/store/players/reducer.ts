import update from 'immutability-helper'
import { Action as ReduxAction } from 'redux'
import type { Player } from './types'

interface AddPlayer extends ReduxAction<'ADD_PLAYER'> {
  name: string
  phase: number
}

interface InitializeGameResponse extends ReduxAction<'INITIALIZE_GAME_RESPONSE'> {
  response: {
    players: Player[]
  }
}

type Action =
  | AddPlayer
  | InitializeGameResponse

type PlayerState = Record<string, Player>

const initialState: PlayerState = { }

export const playersReducer = (state=initialState, action: Action): PlayerState => {
  switch (action.type) {
    case 'INITIALIZE_GAME_RESPONSE':
      return action.response.players.reduce((acc: PlayerState, p: Player) => {
        acc[p.name] = p
        return acc
      }, initialState)

    case 'ADD_PLAYER':
      return update(state, { $merge: {
        [ action.name ]: { name: action.name }
      }})

    default:
      return state
  }
}
