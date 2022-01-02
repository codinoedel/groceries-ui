import update from 'immutability-helper'
import { Action as ReduxAction } from 'redux'
import type { Card, Color, DrawLocation, Hand, TurnStage, Value } from './types'

interface AddToPlay extends ReduxAction<'ADD_TO_PLAY'> {
  color: Color
  value: Value
}

interface DiscardResponse extends ReduxAction<'DISCARD_RESPONSE'> {
  request: {
    action: {
      color: Color
      value: Value
    }
  }
}

interface DrawCardResponse extends ReduxAction<'DRAW_CARD_RESPONSE'> {
  response: Card
}

interface InitializeGameResponse extends ReduxAction<'INITIALIZE_GAME_RESPONSE'> {
  response: {
    userPlayer: string
    hand: Hand
    topCard: Card
    currentTurn: string
  }
}

interface MakePlayResponse extends ReduxAction<'MAKE_PLAY_RESPONSE'> {}

interface SkipPlay extends ReduxAction<'SKIP_PLAY'> {}

type Action =
  | AddToPlay
  | DiscardResponse
  | DrawCardResponse
  | InitializeGameResponse
  | MakePlayResponse
  | SkipPlay

export type Game = {
  currentTurn?: string
  hand: Hand
  stage: TurnStage
  play: Card[]
  topCard: Card | null
  userPlayer: string
}

const initialState: Game = {
  hand: [],
  stage: 'draw',
  play: [],
  topCard: null,
  userPlayer: '',
}

export const gameReducer = (state=initialState, a: Action): Game => {
  switch (a.type) {
    case 'ADD_TO_PLAY':
      return update(state, { $merge: {
        play: update(state.play, { $push: [
          { color: a.color, value: a.value },
        ]})
      }})

    case 'INITIALIZE_GAME_RESPONSE':
      return update(state, { $merge: {
        userPlayer: a.response.userPlayer,
        hand: a.response.hand,
        topCard: a.response.topCard,
        currentTurn: a.response.currentTurn,
      }})

    case 'DRAW_CARD_RESPONSE':
      return update(state, { $merge: {
        hand: update(state.hand, { $push: [ a.response ] }),
        stage: 'play',
      }})

    case 'SKIP_PLAY':
    case 'MAKE_PLAY_RESPONSE':
      return update(state, { $merge: {
        stage: 'discard'
    }})

    case 'DISCARD_RESPONSE':
      const index = state.hand.findIndex((c) => c.color === a.request.action.color && c.value === a.request.action.value)

      if (index === -1) { return state }

      return update(state, { $merge: {
        stage: 'draw',
        hand: update(state.hand, { $splice: [[index, 1]] })
      }})

    default:
      return state
  }
}
