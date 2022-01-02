import { Middleware } from 'redux'

import { getTopCard } from './game/selectors'
import type { Hand, Card } from './game/types'
import type { AppState } from './'

const testHand: Hand = [
  { color: 'red', value: 10 },
  { color: 'blue', value: 2 },
  { color: 'yellow', value: 8 },
  { color: 'green', value: 1 },
  { color: 'red', value: 9 },
  { color: 'blue', value: 11 },
  { color: 'yellow', value: 2 },
  { color: 'blue', value: 4 },
  { color: 'any', value: 'skip' },
  { color: 'any', value: 'wild' },
]

const testPlayers = [
  { name: 'codi', phase: 0, handSize: 9, play: [] },
  { name: 'sam', phase: 1, handSize: 6, play: [ { color: 'red', value: 2 }, { color: 'green', value: 3 } ] },
  { name: 'sally', phase: 0, handSize: 9, play: [] },
  { name: 'em', phase: 1, handSize: 8, play: [ { color: 'blue', value: 8 }, { color: 'red', value: 9 }, { color: 'yellow', value: 10 } ] },
  { name: 'rosalie', phase: 1, handSize: 7, play: [ { color: 'green', value: 8 }, { color: 'yellow', value: 9 }, { color: 'blue', value: 9 }, { color: 'blue', value: 10 } ] },
  { name: 'josh', phase: 0, handSize: 9, play: [] },
]


const testTopCard: Card = { color: 'red', value: 5 }

export const testServer: Middleware<{}, AppState> = ({ dispatch, getState }) => next => action => {
  switch(action.type) {
    case 'INITIALIZE_GAME_REQUEST':
      dispatch({
        type: 'INITIALIZE_GAME_RESPONSE',
        request: action,
        response: {
          userPlayer: action.action.name,
          hand: testHand,
          topCard: testTopCard,
          currentTurn: action.action.name,
          players: [ ...testPlayers, { name: action.action.name, phase: 0, handSize: 9, play: [] } ]
        }
      })
      break

    case 'DRAW_CARD_REQUEST':
      dispatch({
        type: 'DRAW_CARD_RESPONSE',
        request: action,
        response: action.location === 'discard' ? getTopCard(getState()) : { color: 'blue', value: 2 },
      })
      break

    case 'DISCARD_REQUEST':
      dispatch({
        type: 'DISCARD_RESPONSE',
        request: action,
      })
      break
  }

  return next(action)
}
