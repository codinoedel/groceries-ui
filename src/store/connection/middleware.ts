import { Middleware } from 'redux'
import { AppState } from '../'
import { config } from './config'

import { Dispatch, Action } from 'redux'
import { connect, connected, disconnected } from './actions'

const url = config.DEFAULT.url

export const connectionManager = (): Middleware<{}, AppState> => {
  let ws: WebSocket;

  const onOpen = (dispatch: Dispatch) => () => {
    dispatch(connected())
  }

  const onClose = (dispatch: Dispatch) => (msg: CloseEvent) => {
    // TODO: reconnect if we've lost our connection
    console.log('msg', msg)
  }

  const onMessage = (dispatch: Dispatch) => (msg: MessageEvent) => {
    const data = JSON.parse(msg.data)

    dispatch({ type: msg.type, data })
  }

  return ({ dispatch }) => next => action => {
    switch(action.type) {
      case 'CONNECT':
        ws = new WebSocket(url)

        dispatch(connected())

        ws.onopen = onOpen(dispatch)
        ws.onmessage = onMessage(dispatch)
        ws.onclose = onClose(dispatch)

        break

      case 'DISCONNECTED':
        if (ws) { ws.close() }

        break
    }

    if (action.message) {
      dispatch({ type: `${action.type}_REQUEST`, action })

      ws.send(JSON.stringify(action))
    }

    return next(action)
  }
}
