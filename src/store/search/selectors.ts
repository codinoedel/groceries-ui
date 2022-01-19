import type { AppState } from '../'

import type { Item } from './types'

export const getSearchResults = (state: AppState): Item[] => state.search.items
