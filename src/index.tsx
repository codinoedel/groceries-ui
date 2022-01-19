import 'preact/devtools'
import { render } from 'preact'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { configureStore } from './store'
import { App } from './App'

import './index.scss'

const { store , persistor } = configureStore()

render(
  <Provider store={store}>
    <PersistGate loading='loading' persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.body
)
