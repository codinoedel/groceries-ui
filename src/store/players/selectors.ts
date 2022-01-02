import { useAppSelector } from '../../hooks'
import { getUserPlayerName } from '../game/selectors'

import type { AppState } from '../'
import type { Card } from '../game/types'
import type { Player } from './types'

export const getPlayers = (state: AppState): Player[] => (
  Object.values(state.players)
)

export const getHandSize = (playerName: string) => (state: AppState): number => (
  state.players[playerName].handSize
)

export const getPlay = (playerName: string) => (state: AppState): Card[] => (
  state.players[playerName].play
)
