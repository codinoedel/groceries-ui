import 'preact/devtools'
import { render } from 'preact'
import { Provider } from 'react-redux'

import { configureStore } from './store'
import { App } from './App'

import './index.scss'

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.body
)
