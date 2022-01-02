import type { Card } from '../game/types'

export interface Player {
  name: string
  phase: number
  handSize: number
  play: Card[]
}
