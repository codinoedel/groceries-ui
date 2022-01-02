import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './rootReducer'
import { connectionManager } from './connection/middleware'
import { testServer } from './testServer'

export const configureStore = () => {
  const middlewares = [ connectionManager(), testServer ]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, composedEnhancers)

  return store
}

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = ReturnType<typeof configureStore>
