import './app.scss'

import { AddPurchase } from '../AddPurchase'
import { Purchases } from '../Purchases'

export const App = () => (
  <div class='app'>
    <AddPurchase />
    <Purchases />
  </div>
)
