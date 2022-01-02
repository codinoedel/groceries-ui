import update from 'immutability-helper'
import { Action as ReduxAction } from 'redux'

interface Connecting extends ReduxAction<'CONNECTING'> {}
interface Connected extends ReduxAction<'CONNECTED'> {}
interface Disconnected extends ReduxAction<'DISCONNECTED'> {}

type Action =
  | Connecting
  | Connected
  | Disconnected

export type Connection = {
  state: 'connecting' | 'connected' | 'disconnected'
}
const initialState: Connection = {
  state: 'disconnected'
}

export const connectionReducer = (state=initialState, a: Action): Connection => {
  switch (a.type) {
    case 'CONNECTING':
      return update(state, { $merge: { state: 'connecting' }})

    case 'CONNECTED':
      return update(state, { $merge: { state: 'connected' }})

    case 'DISCONNECTED':
      return update(state, { $merge: { state: 'disconnected' }})

    default:
      return state
  }
}
