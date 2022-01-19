import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './rootReducer'
import { send } from './http'

const persistConfig = {
  key: 'groceries-app',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configureStore = () => {
  const middlewares = [ send ]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [ middlewareEnhancer ]
  const composedEnhancers = composeWithDevTools(...enhancers) as any

  const store = createStore(persistedReducer, composedEnhancers) as any
  const persistor = persistStore(store)

  return { store, persistor }
}

export type AppState = ReturnType<typeof persistedReducer>
