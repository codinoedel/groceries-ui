import { useAppDispatch } from '../../hooks'
import type { Card, Color, Value } from './types'

export const addToPlay = (color: Color, value: Value) => ({
  type: 'ADD_TO_PLAY',
  color,
  value,
})

export const discard = (color: Color, value: Value) => ({
  type: 'DISCARD',
  message: 'Discard',
  color,
  value,
})

export const drawFromDeck = () => ({
  type: 'DRAW_CARD',
  message: 'DrawCard',
  drawLocation: 'deck',
})

export const drawFromDiscard = () => ({
  type: 'DRAW_CARD',
  message: 'DrawCard',
  drawLocation: 'discard',
})

export const skipPlay = () => ({
  type: 'SKIP_PLAY',
})

export const submitPhase = (cards: Card[]) => ({
  type: 'SUBMIT_PHASE',
  message: 'SubmitPhase',
  cards,
})

export const playOnPhase = (cards: Card[]) => ({
  type: 'PLAY_ON_PHASE',
  message: 'PlayOnPhase',
  cards,
})

export const initializeGame = (name: string) => ({
  type: 'INITIALIZE_GAME',
  message: 'InitializeGame',
  name,
})
