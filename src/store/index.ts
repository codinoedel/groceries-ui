import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './rootReducer'
import { send } from './http'

export const configureStore = () => {
  const middlewares = [ send ]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, composedEnhancers)

  return store
}

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = ReturnType<typeof configureStore>
