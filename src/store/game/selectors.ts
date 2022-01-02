import type { AppState } from '../'
import type { Card, Hand, TurnStage } from './types'

export const getCurrentTurn = (state: AppState): string => (
  state.game.currentTurn || 'nobody'
)

export const getHand = (state: AppState): Hand => (
  state.game.hand || []
)

export const getIsGameInitialized = (state: AppState): boolean => (
  state.game.userPlayer.length > 0
)

export const getIsUserDiscarding = (state: AppState): boolean => (
  getIsUserTurn(state) && state.game.stage === 'discard'
)

export const getIsUserDrawing = (state: AppState): boolean => (
  getIsUserTurn(state) && state.game.stage === 'draw'
)

export const getIsUserPlaying = (state: AppState): boolean => (
  getIsUserTurn(state) && state.game.stage === 'play'
)

export const getIsUserTurn = (state: AppState): boolean => (
  state.game.userPlayer === state.game.currentTurn
)

export const getTopCard = (state: AppState): Card | null => (
  state.game.topCard
)

export const getTurnStage = (state: AppState): TurnStage => (
  state.game.stage
)

export const getUserPlayerName = (state: AppState): string => (
  state.game.userPlayer
)
